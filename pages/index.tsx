import { Button, Dialog, TextArea, TextField, Toaster, ToasterPosition } from '@hackplan/uui';
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import AES from 'crypto-js/aes';
import cryptoUtf8 from 'crypto-js/enc-utf8';
import copy from 'copy-to-clipboard';

const cryptContent = (content: string, key: string) => AES.encrypt(content, key).toString();
const GlobalMsg: any = Toaster.create({
  maxToasts: 5,
  position: ToasterPosition.TopRight,
})

const IndexPage = (props: any) => {
  const beforeDecryptDialogStatus: boolean = (props.cryptBase64 && props.cryptBase64.length > 0) ? true : false
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [inputStatus, setInputStatus] = useState(true);
  const [cryptResult, setCryptResult] = useState("项目开源在 github.com/u-u-z/EncryptedClipboard")
  const [decryptDialogStatus, setDecryptDialogStatus] = useState(beforeDecryptDialogStatus);
  const [resultError, setResultError] = useState(false);
  useEffect(() => {
    if (inputStatus === false) {
      setInputStatus(true)
      setCryptResult("项目开源在 github.com/u-u-z/EncryptedClipboard")
    }
  }, [content]);

  return <div className="">
    <Head>
      <title>加密剪贴板</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="keywords" content="加密剪贴板,在线剪贴板,在线加密剪贴板" />
      <meta name="description" content="一个在线加密剪贴板" />
      <link rel="icon" href="/logo.jpg" sizes="357x357" type="image/jpeg"></link>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      {/* <link rel="icon" href="/kc-icon.png" sizes="512x512" type="image/png"></link> */}
    </Head>
    <Dialog open={decryptDialogStatus} focusTrap={true} >
      <div style={{
        width: 400,
        height: 150
      }}>
        <h1 style={{ marginTop: 0 }}>解密你的剪贴板</h1>
        <TextField type='password' value={password} showPasswordVisibleButton onChange={(value: string) => {
          setPassword(value);
        }} placeholder={'请输入解密密码'} />
        {resultError ? <p className="text-sm text-red-500 mt-2">密码错误/链接不完整/内容为空</p> : <></>}
      </div>
      <div className="flex flex-row justify-end">
        <Button className="bg-red-500" styling={{
          type: 'primary'
        }} onClick={() => {
          try {
            const decryptContent = AES.decrypt(props.cryptBase64, password).toString(cryptoUtf8)
            if (decryptContent) {
              setContent(AES.decrypt(props.cryptBase64, password).toString(cryptoUtf8))
              setDecryptDialogStatus(value => { return !value })
            } else {
              setResultError(true)
            }

          } catch (e) {
            GlobalMsg.show({ message: "解密失败，可能是链接不完整！" })
          }
        }}>
          解密
        </Button>
        <Button className="bg-red-500 ml-2" onClick={() => {
          setDecryptDialogStatus(value => {
            return !value;
          });
        }}>
          关闭
        </Button>
      </div>
    </Dialog>
    <div className="bg-gray-200">
      <div className="p-4 max-w-xl mx-auto">
        <div className="flex p-4 items-center">
          <div className="font-black text-gray-700 text-4xl flex-1">加密剪贴板</div>
        </div>
      </div>
    </div >
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex p-4 items-center">

        <TextArea className="h-64" value={content} maxLength={1000} showLengthIndicator onChange={(value: string) => {
          setContent(value);
        }} placeholder={'请输入您需要加密的内容...'} />

      </div>
      <div className="flex p-4 items-center">
        <TextField type='password' value={password} showPasswordVisibleButton onChange={(value: string) => {
          setPassword(value);
        }} placeholder={'密码'} />
      </div>
      <div className="flex flex-row-reverse p-4 items-center">
        <button onClick={() => {
          
          if (content.length > 0, password.length > 0) {
            const urlParam: string = encodeURIComponent(cryptContent(content, password))
            setCryptResult(`${window.location.origin}/?s=${urlParam}`)
            setInputStatus(false)
          } else {
            GlobalMsg.show({ message: "请输入加密内容或密码" })
          }

        }} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" >创建加密链接</button>
      </div>
      <div className="flex p-4 items-center ">
        <TextField className=" py-4" type='text' value={cryptResult} disabled />
        {
          !inputStatus ? <button onClick={() => {
            copy(cryptResult)
            GlobalMsg.show({ message: "复制成功?!" })
          }} className="bg-green-500 hover:bg-green-400 font-bold w-1/4 h-8  mx-1 rounded text-white">复制</button> : <></>
        }
      </div>
      <hr className="mt-8" />
      <div className="p-4  ">
        <p className="text-center text-sm text-gray-400">
          加密剪贴板 ❤ <a href="https://uui.cool/" target="_blank">UUI</a> &nbsp;
          |&nbsp; <a href="https://linux.dog/" target="_blank">RemiIO&lt;i@remi.email&gt;</a> &nbsp;|&nbsp;
          项目测试中 ··· 临时域名
        </p>
      </div>

    </div>

  </div>
}

IndexPage.getInitialProps = async (params: any) => {
  try {
    if (params.query.s) {
      return {
        cryptBase64: decodeURIComponent(params.query.s)
      }
    } else {
      return {}
    }
  } catch {
    return {}
  }
}


export default IndexPage
