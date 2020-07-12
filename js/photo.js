'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var UserPhotoChooserElement = document.querySelector('.ad-form-header__input');
  var userPreviewElement = document.querySelector('.ad-form-header__preview img');
  var housePhotoChooserElement = document.querySelector('.ad-form__input');
  var housePreviewElement = document.querySelector('.ad-form__photo');

  var photoChooser = function (chooser, preview) {
    var file = chooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
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

  UserPhotoChooserElement.addEventListener('change', function () {
    photoChooser(UserPhotoChooserElement, userPreviewElement);
  });

  housePhotoChooserElement.addEventListener('change', function () {
    var newHouseImageElement = document.createElement('img');
    newHouseImageElement.width = 70;
    newHouseImageElement.height = 70;
    var newPreview = housePreviewElement.appendChild(newHouseImageElement);
    photoChooser(housePhotoChooserElement, newPreview);
  });
})();
