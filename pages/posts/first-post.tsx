
import React from 'react';
import Link from 'next/link';
import png from 'assets/12.png';


export default function firstPost() {
  return (
    <div>hello this is a page
      <Link href='/'><a>点击吧</a></Link>
      <img src={png} alt="" />
    </div>
  )
}