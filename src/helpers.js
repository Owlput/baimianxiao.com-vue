//prettier-ignore
export function roundNumber(n,d){let x=(''+n).length,p=Math.pow;d=p(10,d);x-=x%3;return Math.round(n*d/p(10,x))/d+" kMGTPE"[x/3]} //https://stackoverflow.com/questions/9345136/1000000-to-1m-and-1000-to-1k-and-so-on-in-js
//prettier-ignore
export function randomHex(length){return [...Array(length)].map(()=>Math.floor(Math.random()*16).toString(16)).join("")}
//prettier-ignore
export function copyToClipboard(value){navigator.clipboard.writeText(value);alert("Copied")}
export function handleStatus(e) {
  let status = [];
  //prettier-ignore
  if (e.axios) 
    switch (axiosError.value.message) {
            case "Network Error": status.push("beTimeout"); return;
            default: status.push("brokenLib"); return;
          }
  return status;
}
