var catImages = [
  {
    name: "soytan",
    src:
      "http://sciencenordic.com/sites/default/files/imagecache/620x/413474560.jpg",
    clicks: 0
  }
];

var controller = {
  indexOnDisplay: 0,
  init: function() {
    listView.init();
    imageView.init();
  },
  getImageOnDisplay: function() {
    return catImages[this.indexOnDisplay];
  },

  onClickListImage: function(index) {
    this.indexOnDisplay = index;
    catImage = catImages[index];
    catImage.clicks += 1;
    listView.render(index);
    imageView.render(catImage);
  },

  onClickDisplayImage: function() {
    imageOnDisplay = catImages[this.indexOnDisplay];
    imageOnDisplay.clicks += 1;
    imageView.render(imageOnDisplay);
  },

  add: function(name, url) {
    catImages.push({ name: name, src: url, clicks: 0 });
    this.indexOnDisplay = catImages.length - 1;
    listView.init();
    imageView.init();
  },

  remove: function(index) {
    catImages.splice(index, 1);
    this.indexOnDisplay = index - 1;
    listView.init();
  }
};

var imageView = {
  init: function() {
    this.render(controller.getImageOnDisplay());
    $("#cat-image-ondisplay").click(function() {
      controller.onClickDisplayImage();
    });
  },

  render: function(catImage) {
    $("#cat-name").text(catImage.name.toUpperCase());
    $("#cat-image-ondisplay").attr("src", catImage.src);
    $("#cat-clicks").text(catImage.clicks);
  }
};

var listView = {
  init: function() {
    var liItemStr, i;
    $("#cat-images").empty();
    for (i = 0; i < catImages.length; i++) {
      liItemStr = `<li class="list-group-item"><img class="img-fluid rounded mx-auto"
            src=${catImages[i].src}></li>`;
      $("#cat-images").append(liItemStr);
    }
    this.render();

    $(".list-group-item").click(function() {
      controller.onClickListImage($(this).index());
    });

    $("#new-cat-form").submit(function(e) {
      e.preventDefault();
      $("#newCatModal").modal("hide");
      var nameElem = $("#new-cat-name");
      var urlElem = $("#new-cat-url");
      controller.add(nameElem.val(), urlElem.val());
      nameElem.val(""), urlElem.val("");
    });
  },

  render: function(activeIndex) {
    var listClass = "list-group-item-warning";
    var activeCatImage = $(".list-group-item").eq(activeIndex || 0);
    activeCatImage.siblings().removeClass(listClass);
    activeCatImage.addClass(listClass);
  }
};

controller.init();
