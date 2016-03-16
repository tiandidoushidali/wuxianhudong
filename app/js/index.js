var buyerShowsApi = 'http://admwuxianhudong.hz.taeapp.com/wuxianhudong/index.php?m=home&c=goods&a=index&mod=aglvs';

$(window).on('load', function() {
  function unique(array) {
    var nary = array.sort();
    for (var i = 0; i < nary.length - 1; i++) {
      if (nary[i] == nary[i + 1]) {
      }
    }
  }

  function getSelectedBuyerShows() {
    const $productCheckBox = $('.checkbox--choose-buyer-shows');
    const selectedBuyerShows = [];
    $productCheckBox.map(function(index, checkbox) {
      if (checkbox.checked) {
        selectedBuyerShows.push({
          buyerShowId: $(this).data('buyer-show-id'),
          productId: $(this).data('product-id'),
          description: $(this).data('description'),
          picture: $(this).data('picture')
        });
      }
    });
    return selectedBuyerShows;
  }

  //选择商品
  var $chooseBuyerShow = $('#chooseBuyerShow');
  var $myModal = $('#myModal');
  var $modalBodyTable = $('.modal-body-table');
  $myModal.css({'width': '800px', 'margin-left': '-400px'});

  //$modalBodyTable.delegate('.product-list-item--clickable', 'click', function(e) {
  //  var $checkbox = $(this).find('.checkbox').checkbox();
  //  var $currentTarget = $(e.currentTarget);
  //  $checkbox.checkbox($currentTarget.data('toggle'))
  //});

  $myModal.on('okHidden', function(e) {
    var $selectedBuyerShowsContainer = $('.selected-buyer-shows-container');
    var $selectedBuyerShows = getSelectedBuyerShows();
    $selectedBuyerShows.map(function(item, index) {
      $selectedBuyerShowsContainer.append(
        '<img src="' + item.picture + '"/>'
      )
    });
  });

  $myModal.on('cancelHide', function(e) {
    const hasSelectedBuyerShows = getSelectedBuyerShows().length > 0;
    if (hasSelectedBuyerShows) {

    }
    console.log('cancelHide')
  });

  $chooseBuyerShow.click(function() {
    $.ajax({
      url: 'mock/buyerShow.json',
      type: 'GET',
      data: 'json',
      success: function(response) {
        if (response.state === 1) {
          response.data.map(function(item, index) {
            $modalBodyTable.append(
              '<tr class="buyer-shows__item">' +
              '<td width="5%"><label class="checkbox inline checked pull-left">' +
              '<input type="checkbox" class="checkbox--choose-buyer-shows checkbox--large" data-buyer-show-id="' + item.id + '" data-product-id="' + item.itemId + '" data-picture="' + item.picture + '" data-description="' + item.description + '"></label>' +
              '</td>' +
              '<td width="15%"><div class="typographic"><img src="' + item.picture + '"/></div></td>' +
              '<td>' +
              '<span>' + item.description + '</span>' +
              '</td>' +
              '</tr>'
            )
            ;
          });
        }
      }
    });
  });

  QN.initTheme();
});

//$('#myModal').on('okHide', function(e) {
//});

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