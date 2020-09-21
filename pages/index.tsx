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
      </div>
      <div className="flex flex-row justify-end">
        <Button className="bg-red-500" styling={{
          type: 'primary'
        }} onClick={() => {
          try {
            setContent(AES.decrypt(props.cryptBase64, password).toString(cryptoUtf8))
            setDecryptDialogStatus(value => { return !value })
          } catch (e) {

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
          setInputStatus(false)
          const urlParam: string = encodeURIComponent(cryptContent(content, password))
          // console.log('length', urlParam.length)
          setCryptResult(`${window.location.origin}/?s=${urlParam}`)
        }} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" >创建链接</button>
      </div>
      <div className="flex p-4 items-center ">
        <TextField className="appearance-none py-4" type='text' value={cryptResult} disabled />
        {
          !inputStatus ? <Button onClick={() => {
            copy(cryptResult)
            GlobalMsg.show({ message: "复制成功?!" })
          }} className="flex-shrink-0 px-6 mx-1">复制</Button> : <></>
        }
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
