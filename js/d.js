            $(window).on('load', function() {
                setTimeout(function () {
                    getUser();
                }, 1000);
            }); 
            $(document).on('click', '#user tbody tr a[id="remove"]', function () {
                var id = $(this).data('id');
                alert( 'Test on '+id+'\'s row' );
            });
            $(document).on('click', '#user tbody tr a[id="changerule_form"]', function () {
                var tr = $(this).closest('tr');
                var table = $('#user').DataTable();
                var id = table.row(tr).data()[0];
                var name = $(table.row(tr).data()[1]).text();
                $("#user_id").val(id);
                $('#changerule_name').text(name);
            });
            
            $('#rule').change(function(e) {
                e.preventDefault();
                if ($('#rule').val() == 'leader') {
                    $("#group_class").append('<label>Lá»›p</label><select id="class"></select>');
                    $("#class").empty();
                    $("#class").append('<option value="" disabled selected>Äang xá»­ lĂ½</option>');
                    $.ajax({
                        beforeSend: function () {
                            show_loading();
                        },
                        type: "POST",
                        url: "/ajax.php",
                        dataType: "json",
                        data: {
                            cmd: "getclass",
                            grade:"all"
                        },
                        success: function(info) {
                            if (info.success === true) {
                                data = info.data;
                                $("#class").empty();
                                $("#class").append('<option value="" disabled selected>Chá»n lá»›p</option>');
            			        $.each(data, function(key, val) {
            				    $("#class").append('<option value="'+ data[key]['class'] +'">'+ data[key]['class']+'</option>');
                                });
                            } else {
                                showError(info.msg);
                                $("#class").empty();
                            }
                        },
                        complete: function() {
                            hide_loading();
                        }
                    });
                } else {
                    $("#group_class").empty();
                }
            });
            $('#btnChangeRule').click(function(e) {
                e.preventDefault();
                swal({
                    title: 'XĂ¡c nháº­n',
                    text: "Báº¡n cĂ³ muá»‘n cáº­p nháº­t quyá»n truy cáº­p cho ngÆ°á»i nĂ y khĂ´ng?",
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonText: "Há»§y bá»",
                    cancelButtonColor: "red",
                    confirmButtonText: "Äá»“ng Ă½",
                    allowOutsideClick: false,
                    allowEscapeKey: false
                }).then((result) => {
                    if (result.value) {
                        $.ajax({
                            beforeSend: function () {
                                show_loading();
                            },
                            type: "POST",
                            url: "admin.php",
                            dataType: "json",
                            data: {
                                cmd: "changerule",
                                uid: $('#user_id').val(),
                                rule: $('#rule').val(),
                                id_class: $('#class').val()
                            },
                            success: function(response) {
                                if (response.success === true) {
                                    swal({
                                        title: "ThĂ nh cĂ´ng",
                                        text: "Thay Ä‘á»•i thĂ nh cĂ´ng.",
                                        type: "success",
                                        confirmButtonText: "Äá»“ng Ă½",
                                        allowOutsideClick: false,
                                        allowEscapeKey: false
                                    }).then(function () { 
                                        getUser();
                                        $('.back_btn').click();
                                    });
                                } else {
                                    showError(response.msg);
                                }
                            },
                            complete: function() {
                                hide_loading();
                            }
                        });
                    }
                });
            });

function getUser () {
    $('#highschool').empty();
    $('#highschool').append('<table id="user" class="table user-list" style="display:none;">\
                            <thead>\
                                <tr>\
                                    <th>STT</th>\
                                    <th>TĂªn</th>\
                                    <th>Chá»©c danh</th>\
                                    <th>NgĂ y táº¡o tĂ i khoáº£n</th>\
                            <!--    <th>Thao tĂ¡c gáº§n nháº¥t</th> -->\
                                    <th>Äá»‹a chá»‰ IP</th>\
                                    <th>TĂ¹y chá»n</th>\
                                </tr>\
                            </thead>\
                            <tbody id="resultzone">\
                            </tbody>\
                        </table>');
    $.ajax({
        beforeSend: function () {
            show_loading();
        },
        type: "POST",
        url: "admin.php", 
        dataType: "json",
        data: {
            cmd: "getUser" 
        },
        success: function(info) {
            if (info.success === true) {
                data = info.data;
                $("#resultzone").empty();
    	        $.each(data, function(key, val) {
    	            if(data[key]['type'] == 'admin') {
    	                badge = 'badge badge-danger';
    	                type = 'Administrator';
    	                details = 'Quáº£n trá»‹ viĂªn';
    	            } else if(data[key]['type'] == 'moderator') {
    	                badge = 'badge badge-warning';
    	                type = 'Moderator';
    	                details = 'Äiá»u hĂ nh viĂªn';
    	            } else if(data[key]['type'] == 'member') {
    	                badge = 'badge badge-success';
    	                type = 'Member';
    	                details = 'ThĂ nh viĂªn';
    	            } else if(data[key]['type'] == 'blocked') {
    	                badge = 'badge badge-dark';
    	                type = 'Blocked';
    	                details = 'Bá»‹ khĂ³a';
    	            } else if(data[key]['type'] == 'pending') {
    	                badge = 'badge badge-secondary';
    	                type = 'Pending';
    	                details = 'Chá» duyá»‡t';
    	            } else {
    	                badge = 'badge badge-primary';
    	                type = 'Leader';
    	                details = 'Lá»›p trÆ°á»Ÿng ' + data[key]['type'].substring(7, 12);
    	            }
    		        $("#resultzone").append('<tr> <td style="width: 1%">'+ data[key]['id'] +'</td>\
    		        <td> <a href="#">'+ data[key]['fullname']+'</a> </td> <td> <span class="'+badge+'">'+type+'</span><br><i>'+details+'</i> </td> \
    		        <td>'+data[key]['created_time']+'</td>\
    		        <td>'+data[key]['ip_address']+'</td> \
    		        <td style="width: 10%;"> <a href="#modal" id="changerule_form" title="Thay Ä‘á»•i chá»©c danh"> <span class="fa-stack"> <i class="fa fa-square fa-stack-2x"></i> <i class="fa fa-pencil-alt fa-stack-1x fa-inverse"></i> </span> </a> <a title="XĂ³a tĂ i khoáº£n" href="javascript:void(0);" id="remove" data-id="'+data[key]['id']+'" style="color:red;"> <span class="fa-stack"> <i class="fa fa-square fa-stack-2x"></i> <i class="fa fa-trash-alt fa-stack-1x fa-inverse"></i> </span> </a> </td></tr>');
                });
                $('#user tbody tr a[id="changerule_form"]').leanModal({
            		top: 100,
            		overlay: 0.6,
            		closeButton: ".back_btn"
                });
                var table = $('#user').DataTable();
                $("table").show();
            } else {
                showError(info.msg);
                $("#uid").empty();
            }
        },
        complete: function() {
            hide_loading();
        }
    });
}
