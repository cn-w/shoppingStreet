import jQuery from 'jquery'

export function getAjax(url) {
  // console.log(222);
  // jQuery(function () {

  //   jQuery.ajax({
  //     url: 'http://123.207.32.32:8000/home/multidata', success: function (responsive) {
  //       console.log(responsive);
  //       return responsive
  //     }
  //     , error: function (xhr) {
  //       alert(xhr.status);
  //     }, async: true
  //   })
  //   console.log(3333)
  // })
  // $(document).ajaxSuccess(function(){
  //   return req
  // })


  // var xhr = new XMLHttpRequest()
  // xhr.open('get', 'http://123.207.32.32:8000/home/multidata')
  // xhr.send()
  // return xhr

  // promise--ajax

  const promise = new Promise(function (resolve, reject) {
    const handler = function () {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

  });

  return promise;
};

