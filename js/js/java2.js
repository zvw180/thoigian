var host = "https://testapi.io/api/Nam/190";

$(document).ready(function () {
    $.ajax({
        url: host,
        type: "GET",
        success: function (d) {
            //Các dữ liệu xử lý chỗ này.
            $("#spinner").hide();
            for (let i = 0; i < d.length; i++) {
                let tr = '<tr>';
                let td = '<td>';
                let html = tr + td +  d[i].name +  td + d[i].massv + td + d[i].den + td + d[i].ra;
                // td += '<td>' + '<img  src="' + data[i].picture + ' ">' + '</td>';
                // td += '<td>' + data[i].tenlop + '</td>';
                // td += '<td>' + data[i].siso + '</td>';
                // td += '<td>' + data[i].vang + '</td>';
                // td += '<td>' + data[i].fa + '</td>';
                // tr += td + '</tr>';
                $('tbody').append(html);
            }
        }
    });
})

    /////////////////////////////////////////////////////////
    //Hiển thị dữ liệu lấy từ API, mặc định khi load trang
    /////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////
    //Bắt sự kiện nhấn nút thêm khách hàng
    /////////////////////////////////////////////////////////

