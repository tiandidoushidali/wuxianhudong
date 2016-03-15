var productsApi = 'http://admwuxianhudong.hz.taeapp.com/wuxianhudong/index.php?m=home&c=goods&a=index&mod=aglvs';

$(window).on('load', function() {
  var chooseBuyerShow = $('#chooseBuyerShow');
  $('#myModal').css({'width':'800px','margin-left':'-400px'});
  $('.modal-body-table').delegate('.product-list-item','click',function(){
    console.log('===========')
  });
  chooseBuyerShow.click(function() {
    $.ajax({
      url: 'mock/products.json',
      type: 'GET',
      data: 'json',
      success: function(response) {
        if (response.state === 1) {
          response.data.map(function(item, index) {
            $('.modal-body-table').append(
              '<tr class="product-list-item">' +
              '<td width="15%"><label class="checkbox pull-left"><input type="checkbox"></label>' +
              '<div class="typographic"><img src="' + item.pic_url + '"/></div>' +
              '</td>' +
              '<td>' +
              '<span>' + item.title + '</span>' +
              '</td>' +
              '<td>' +
              '<span>买家秀数量: ' + item.show_num + '</span>' +
              '</td>'
            );
          });
        }
      }
    });
  });


  //$('#myModal').on('okHide', function(e) {
  //});
  $('#myModal').on('okHidden', function(e) {
    //console.log('okHidden')
  })
  //$('#myModal').on('cancelHide', function(e) {
  //  console.log('cancelHide')
  //})
  //$('#myModal').on('cancelHidden', function(e) {
  //  console.log('cancelHidden')
  //});


  //const header = function(props) {
  //  const $elem = $(`<div>
  //	<h1>${props.title}</h1>
  //	<p>${props.desc}</p >
  //</div>`);
  //
  //
  //  // on elemnt
  //  $elem.on('click', 'h1', () => console.log('title clicked'))
  //  $elem.on('click', 'p', () => console.log('desc clicked'))
  //
  //  return $elem
  //}
  //
  //
  //$(function() {
  //  $('#root').html(header({
  //    title: 'Title',
  //    desc: 'Desc'
  //  }));
  //});

  QN.initTheme();
});