var fileHandler = {

    loadPictures: function loadFiles() {
        var showFilesElem = $("#show_files");
        return $.ajax(serverConfig.url('files'))
            .done(function (response) {
                showFilesElem
                    .html(tmpl("show_files_template", fileHandler.createResponse(response)))
                    .promise()
                    .done(function () {
                        fileHandler.deletePicture();
                    });
            }).fail(function (jqXHR, textStatus) {
                showFilesElem.html("Error occurred");
                console.log("Request failed: " + textStatus);
            });
    },

    createResponse: function (response) {
        return {
            files: response,
            util:{
                ratioClass: function (image) {
                    var experimental_ratio = 1.45;
                    return image.ratio > experimental_ratio ? 'file bigfile' : 'file';
                },
                getHref: function (image) {
                    return "#show_popup_link_" + image.id;
                },
                thumbnailUrl: function (image) {
                    return serverConfig.url('picture/small/' + image.id);
                },
                imgUrl: function (image) {
                    return serverConfig.url('picture/' + image.id);
                },
                deleteId: function (image) {
                    return 'delete_file_' + image.id;
                }
            }
        };
    },

    deletePicture: function deletePicture() {
        $.each($("form[id^=delete_file_]"), function (i, item) {
            var deleteBox = $(item);
            var deleteId = deleteBox[0].id.split("_").pop();
            deleteBox.submit(function (e) {
                e.preventDefault();
                if (confirm("Are you sure!") == true)
                    $.ajax({
                        url: serverConfig.url('remove/' + deleteId),
                        cache: false,
                        contentType: false,
                        processData: false,
                        type: 'POST'
                    }).done(function () {
                        fileHandler.loadPictures();
                    }).fail(function (jqXHR, textStatus) {
                        alert("Error occurred");
                        console.log("Request failed: " + textStatus);
                    });
            })
        })
    },
    savePictures: function saveFiles() {
        var addPictureFormElem = $('#fileForm');
        addPictureFormElem.submit(function (e) {
            e.preventDefault();
            if (addPictureFormElem.valid()) {
                var data = new FormData($(this)[0]);
                $.ajax({
                    url: serverConfig.url('add'),
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'POST'
                }).done(function () {
                   fileHandler.loadPictures();
                    /*var util = fileHandler.createResponse().util;
                    var html = tmpl("file_template", {file: {name:'ololo', ratio:'123'}, util: util});
                    $('.file').last().append(html);*/
                }).fail(function (jqXHR, textStatus) {
                    alert("Error occurred");
                    console.log("Request failed: " + textStatus);
                });
            }

        });
    }
}