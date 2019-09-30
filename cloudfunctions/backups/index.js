/* eslint-disable */
const request = require('request');
const cloud = require('wx-server-sdk');

// 环境变量
const env = 'rangduju-test-8i0oe';

cloud.init({
  env
});

// 换取 access_token
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

// 创建导出任务
async function createExportJob(accessToken, collection) {
  const date = new Date().toISOString();
  console.log(`${date}.json`,159);
  return new Promise((resolve, reject) => {
    request.post(
      `https://api.weixin.qq.com/tcb/databasemigrateexport?access_token=${accessToken}`,
      {
        body: JSON.stringify({
          env,
          file_path: `${date}.json`,
          file_type: '1',
          query: `db.collection("${collection}").get()`
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

// 查询导出任务状态
async function waitJobFinished(accessToken, jobId) {
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
//传送url链接
async function createExporturl(url) {
  return new Promise((resolve, reject) => {
    request.post(
      `https://api.rangduju.com/wechat/wxcloud-url`,
      {
        headers: {
          'Content-Type':'application/json',
          'wechat-key': '8538e210-9a14-4522-b170-3c406f4d8e66'
        },
        body: JSON.stringify({
          tableName:'fangke',
          url:url
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

exports.main = async (event, context) => {
  // 从云函数环境变量中读取 appid 和 secret 以及数据集合
  // const { appid, secret, backupColl, backupInfoColl } = process.env;
  const appid ='wxa712c55f4c3f00c8';
  const secret = 'acb68f2789eb791f07aa719cad1f950a';
  const backupColl='fangke';
  const backupInfoColl ='backupInfoColl';

  const db = cloud.database();

  try {
    // 获取 access_token
    const { errmsg, access_token } = await getAccessToken(appid, secret);
    console.log(access_token)
    if (errmsg && errcode !== 0) {
      throw new Error(`获取 access_token 失败：${errmsg}` || '获取 access_token 为空');
    }

    // 导出数据库
    const { errmsg: jobErrMsg, errcode: jobErrCode, job_id } = await createExportJob(access_token, backupColl);

    // 打印到日志中
    console.log(job_id);

    if (jobErrCode !== 0) {
      throw new Error(`创建数据库备份任务失败：${jobErrMsg}`);
    }

    // 将任务数据存入数据库
    const res = await db.collection('db_back_info').add({
      data: {
        date: new Date(),
        jobId: job_id
      }
    });

    // 等待任务完成
    const fileUrl = await waitJobFinished(access_token, job_id);

    await createExporturl(fileUrl);
    console.log('导出成功', fileUrl);

    // 存储到数据库
    // await db
    //   .collection(backupInfoColl)
    //   .doc(res._id)
    //   .update({
    //     data: {
    //       fileUrl
    //     }
    //   });
  } catch (e) {
    throw new Error(`导出数据库异常：${e.message}`);
  }
};