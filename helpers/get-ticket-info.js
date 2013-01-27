module.exports = function(data){
  var ticketInfo = [],
      trains = data.split('\\n');

  if(!trains.length)
    return ;
  trains.forEach(function(v, i){
    var arr = v.split(',');
    if(arr.length < 15)
    {
      console.log(arr);
      return ;
    }
    var id = arr[1].match(/id='id_(\w+)'/)[1],
        num = arr[1].match(/>(\w+)</)[1];
    //standardize count
    arr.forEach(function(v, i){
      if(v.match(/--/))
        arr[i] = 0;
      else if(v.match(/有/))
        arr[i] = 999;
      else if(v.match(/无/))
        arr[i] = 0;
      else if(i >= 5 && i <= 15)
        arr[i] = parseInt(arr[i])
    })
    if(arr[16].match(/getSelected\('(.*)'\)/))
    {
      ticketInfo.push({
        trainID: id,
        trainNO: num,
        shangwu: arr[5],
        tedeng: arr[6],
        yideng: arr[7],
        erdeng: arr[8],
        gaojiruanwo: arr[9],
        ruanwo: arr[10],
        yingwo: arr[11],
        ruazuo: arr[12],
        yingzuo: arr[13],
        wuzuo: arr[14],
        qita: arr[15],
        formData: arr[16].match(/getSelected\('(.*)'\)/)[1].split('#')
      })
    }
  })

  return ticketInfo;
}
