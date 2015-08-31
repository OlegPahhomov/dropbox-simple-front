var fileHandler = {

    loadPictures: function loadFiles() {
        var showFilesElem = $("#show_files");
        $.ajax(serverConfig.url('files'))
            .done(function (response) {
                showFilesElem.html(tmpl("show_files_template",
                    {
                        files: response,
                        getRatioClass: function (image) {
                            var experimental_ratio = 1.45;
                            return image.ratio > experimental_ratio ? 'file bigfile' : 'file';
                        }
                    }
                ))
            }).fail(function (jqXHR, textStatus) {
                showFilesElem.html("Error occurred");
                console.log("Request failed: " + textStatus);
            });
    },
    deletePicture: function deletePicture() {
        $.each($("form[id^=delete_file_]"), function (i, item) {
            var deleteBox = $(item);
            var deleteId = deleteBox[0].id.split("_").pop();
            deleteBox.submit(function (e) {
                e.preventDefault();
                $.ajax({
                    url: serverConfig.url('remove/' + deleteId),
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'POST'
                }).done(function () {
                    location.reload();
                }).fail(function (jqXHR, textStatus) {
                    alert("Error occurred");
                    console.log("Request failed: " + textStatus);
                })
            })
        })
    },
    savePictures: function saveFiles() {
        var addPictureFormElem = $('#fileForm');
        addPictureFormElem.submit(function (e) {
            e.preventDefault();
            var data = new FormData($(this)[0]);
            $.ajax({
                url: serverConfig.url('add'),
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST'
            }).done(function () {
               location.reload();
            }).fail(function (jqXHR, textStatus) {
                alert("Error occurred");
                console.log("Request failed: " + textStatus);
            });
        });
    }
}