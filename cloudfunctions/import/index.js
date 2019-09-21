const request = require('request');  //边界
const cloud = require('wx-server-sdk');
const path = require('path');

// 环境变量
const env = 'rangduju-test-8i0oe';

cloud.init({
  env
});

//换取 access_token
async function getAccessToken(appid, secret) {
  return new Promise((resolve, reject) => {
    request.get(
      `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,
      (err, res, body) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(JSON.parse(body));
      }
    );
  });
}

// // 获取数据
async function getData(tablename) {
  console.log(-1);
  return new Promise((resolve, reject) => {
    request.get(
      `https://api.rangduju.com/wechat/tables-data?tablename=` + tablename,
      
      {
        headers: {
          'wechat-key':'8538e210-9a14-4522-b170-3c406f4d8e66'
        },
        body: JSON.stringify({
 
        })
      },
      (err, res, body) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(body));
      }
    );
  });
}

//上传文件
async function uploadFile(accessToken, path) {
  return new Promise((resolve, reject) => {
    request.post(
      `https://api.weixin.qq.com/tcb/uploadfile?access_token=${accessToken}`,
      {
        body: JSON.stringify({
          env,
          path: path,
        })
      },
      (err, res, body) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(body));
      }
    );
  });
}
//处理上传链接
async function processing (res,fileContent,filePath) {
  console.log(1)
  console.log(filePath)
  console.log(fileContent.data)
  let formData = {
    'key': filePath,
    'Signature': res.authorization,
    'x-cos-security-token': res.token,
    'x-cos-meta-fileid': res.cos_file_id,
    'file': fileContent.data
  }
  
  new Promise((resolve, reject) => {
    request({
      url:res.url,
      method:"POST",
      header:{
        'content-type':'multipart/form-data'
      },
      formData: formData
      },
      (err, res, body) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(body));
      }
    );
    // console.log(12);
  });
}

// 创建导入任务
async function createImportJob(accessToken, collection, path) {
 console.log(2)
  return new Promise((resolve, reject) => {
    request.post(
      `https://api.weixin.qq.com/tcb/databasemigrateimport?access_token=${accessToken}`,
      {
        body: JSON.stringify({
          env,
          collection_name: collection.tableName,
          file_path:path,
          file_type: 1,
          stop_on_error: false,
          conflict_mode: 2
        })
      },
      (err, res, body) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(body));
      }
    );
  });
}
// 查询导入任务状态
async function waitJobFinished(accessToken, jobId) {
  console.log(3)
  return new Promise((resolve, reject) => {
    // 轮训任务状态
    const timer = setInterval(() => {
      request.post(
        `https://api.weixin.qq.com/tcb/databasemigratequeryinfo?access_token=${accessToken}`,
        {
          body: JSON.stringify({
            env,
            job_id: jobId
          })
        },
        (err, res, body) => {
          if (err) {
            reject(err);
          }
          const { status, file_url } = JSON.parse(body);
          console.log('查询');
          if (status === 'success') {
            clearInterval(timer);
            resolve(file_url);
          }
        }
      );
    }, 500);
  });
}
exports.main = async (event, context) => {
  // 从云函数环境变量中读取 appid 和 secret 以及数据集合
  // const { appid, secret, backupColl, backupInfoColl } = process.env;

  let arr = ['tongzhi','fangyuan','fangdong','jizhang','shouru','fencheng']
  const appid ='wxa712c55f4c3f00c8';
  const secret = 'acb68f2789eb791f07aa719cad1f950a';
 for(let i in arr){
   console.log(i)
  try {
    // 获取 access_token
    const { errmsg, access_token } = await getAccessToken(appid, secret);

    if (errmsg && errcode !== 0) {
      throw new Error(`获取 access_token 失败：${errmsg}` || '获取 access_token 为空');
    }
    //获取数据
    const data = await getData(arr[i]);
    console.log(data);
    let path= 'data/'+data.tableName+'.json'
    const file = await uploadFile(access_token, path);
    const upload = await processing(file, data, path);

    // 导入数据库
    const { errmsg: jobErrMsg, errcode: jobErrCode, job_id } = await createImportJob(access_token, data, path);

    // 打印到日志中
    console.log(job_id);

    if (jobErrCode !== 0) {
      throw new Error(`创建数据库导入任务失败：${jobErrMsg}`);
    }

    // 等待任务完成
    const fileUrl = await waitJobFinished(access_token, job_id);

    console.log('导入成功', fileUrl);

  } catch (e) {
    console.log(e,1998);
    throw new Error(`导入数据库异常：${e.message}`);
  }
 }
};