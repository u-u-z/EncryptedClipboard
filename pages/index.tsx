import { Button, Dialog, TextArea } from '@hackplan/uui';
import Head from 'next/head'
import React, { useState } from 'react'

const IndexPage = () => {
  const [content, setContent] = useState(null);
  return <div className="">
    <Head>
      <title>加密剪贴板</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="keywords" content="加密剪贴板,在线剪贴板,在线加密剪贴板" />
      <meta name="description" content="一个在线加密的剪贴板" />
      {/* <link rel="icon" href="/kc-icon.png" sizes="512x512" type="image/png"></link> */}
    </Head>
    <div className="bg-gray-200">
      <div className="p-4 max-w-xl mx-auto">
        <div className="flex p-4 items-center">
          <div className="font-black text-gray-700 text-4xl flex-1">加密剪贴板</div>

        </div>
      </div>
    </div >
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex p-4 items-center">
        <TextArea className="h-64" value={content} maxLength={1000} showLengthIndicator onChange={(value: any) => {
          setContent(value);
        }} placeholder={'请输入您需要加密的内容...'} />
      </div>
      <div className="flex flex-row-reverse p-4 items-center">
        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">创建链接</button>
      </div>
      <div className="flex p-4 items-center ">
        <div className="rounded bg-gray-300 w-full p-4">
          <p>项目开源在 github.com/u-u-z/EncryptedClipboard </p>
        </div>
      </div>
    </div>
  </div>
}


export default IndexPage
