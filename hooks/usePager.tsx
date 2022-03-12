
import Link from 'next/link';
import _ from 'lodash';

type Options = {
    page: number;
    totalPage: number;
    pageSize:number;
    urlMaker?: (n: number) => string;
}
const defaultUrlMaker = (n:number,pageSize:number) => `?page=${n}&pageSize=${pageSize}`

export const usePager = (options: Options) => {
    const {page, totalPage, urlMaker: _urlMaker,pageSize} = options;
    const urlMaker = _urlMaker || defaultUrlMaker
    const numbers = [];
    numbers.push(1);
    for (let i = page - 3; i <= page + 3; i++) {
        numbers.push(i);
    }
    numbers.push(totalPage);
    const pageNumbers = _.uniq(numbers).sort().filter(n => n >= 1 && n <= totalPage)
        .reduce((result, n) => n - (result[result.length - 1] || 0) === 1 ?
            result.concat(n) : result.concat(-1, n), []);

    const pager = (
        <div className="wrapper">
            {page !== 1 && <Link href={urlMaker(page - 1,pageSize)}><a>上一页</a></Link>}
            {pageNumbers.map(n => n === -1 ?
                <span>...</span> :
                <Link href={urlMaker(n,pageSize)}><a>{n}</a></Link>)}

            {page < totalPage &&
                <Link href={urlMaker(page + 1,pageSize)}><a>下一页</a></Link>}
            <span>
        第 {page} / {totalPage} 页
      </span>

            <style jsx>{`
        .wrapper {
          margin: 0 -8px;
        }
        .wrapper > a, .wrapper > span{
          margin: 0 8px;
        }
      `}</style>
        </div>

    );
    return {pager};
};
