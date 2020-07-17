'use strict';

(function () {
  var fileTypes = ['gif', 'jpg', 'jpeg', 'png'];

  var imageParameters = {
    width: 70,
    height: 70
  };

  var userPhotoChooserElement = document.querySelector('.ad-form-header__input');
  var userPreviewElement = document.querySelector('.ad-form-header__preview img');
  var housePhotoChooserElement = document.querySelector('.ad-form__input');
  var housePreviewElement = document.querySelector('.ad-form__photo');

  var photoChooser = function (chooser, preview) {
    var file = chooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = fileTypes.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var onUserPhotoChange = function () {
    photoChooser(userPhotoChooserElement, userPreviewElement);
  };

  userPhotoChooserElement.addEventListener('change', onUserPhotoChange);

  var onHousePhotoChange = function () {
    var newHouseImageElement = document.createElement('img');
    newHouseImageElement.width = imageParameters.width;
    newHouseImageElement.height = imageParameters.height;
    var newPreview = housePreviewElement.appendChild(newHouseImageElement);
    photoChooser(housePhotoChooserElement, newPreview);
  };

  housePhotoChooserElement.addEventListener('change', onHousePhotoChange);
})();
