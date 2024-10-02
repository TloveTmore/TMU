(function ($) {
    "use strict"; $(".close_icon").click(function () { $(this).parents(".hide_content").slideToggle("0"); }); var count = $('.counter'); if (count.length) { count.counterUp({ delay: 100, time: 5000 }); }
    $('.nice_Select').niceSelect(); $('.nice_Select2').niceSelect(); $('.default_sel').niceSelect(); $(document).ready(function () { $('#start_datepicker').datepicker(); $('#end_datepicker').datepicker(); }); var delay = 500; $(".progress-bar").each(function (i) { $(this).delay(delay * i).animate({ width: $(this).attr('aria-valuenow') + '%' }, delay); $(this).prop('Counter', 0).animate({ Counter: $(this).text() }, { duration: delay, easing: 'swing', step: function (now) { $(this).text(Math.ceil(now) + '%'); } }); }); $('.sidebar_icon').on('click', function () { $('.sidebar').toggleClass('active_sidebar'); }); $('.sidebar_close_icon i').on('click', function () { $('.sidebar').removeClass('active_sidebar'); }); $('.troggle_icon').on('click', function () { $('.setting_navbar_bar').toggleClass('active_menu'); }); $('.custom_select').click(function () { if ($(this).hasClass('active')) { $(this).removeClass('active'); } else { $('.custom_select.active').removeClass('active'); $(this).addClass('active'); } }); $(document).click(function (event) { if (!$(event.target).closest(".custom_select").length) { $("body").find(".custom_select").removeClass("active"); } }); $(document).click(function (event) { if (!$(event.target).closest(".sidebar_icon, .sidebar").length) { $("body").find(".sidebar").removeClass("active_sidebar"); } }); $("#checkAll").click(function () { $('input:checkbox').not(this).prop('checked', this.checked); }); $('#summernote').summernote({ placeholder: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', tabsize: 2, height: 195 }); $('.lms_summernote').summernote({ placeholder: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', tabsize: 2, height: 188 }); $('.input-file').each(function () { var $input = $(this), $label = $input.next('.js-labelFile'), labelVal = $label.html(); $input.on('change', function (element) { var fileName = ''; if (element.target.value) fileName = element.target.value.split('\\').pop(); fileName ? $label.addClass('has-file').find('.js-fileName').html(fileName) : $label.removeClass('has-file').html(labelVal); }); }); $('.input-file2').each(function () { var $input = $(this), $label = $input.next('.js-labelFile1'), labelVal = $label.html(); $input.on('change', function (element) { var fileName = ''; if (element.target.value) fileName = element.target.value.split('\\').pop(); fileName ? $label.addClass('has-file').find('.js-fileName1').html(fileName) : $label.removeClass('has-file').html(labelVal); }); }); $("#meta_keywords").tagsinput(); if ($('.lms_table_active').length) { $('.lms_table_active').DataTable({ bLengthChange: false, "bDestroy": true, language: { search: "<i class='ti-search'></i>", searchPlaceholder: 'Quick Search', paginate: { next: "<i class='ti-arrow-right'></i>", previous: "<i class='ti-arrow-left'></i>" } }, columnDefs: [{ visible: false }], responsive: true, searching: false, }); }
    $('.layout_style').click(function () { if ($(this).hasClass('layout_style_selected')) { $(this).removeClass('layout_style_selected'); } else { $('.layout_style.layout_style_selected').removeClass('layout_style_selected'); $(this).addClass('layout_style_selected'); } }); $("#sidebar_menu").metisMenu(); $("#admin_profile_active").metisMenu(); $('.switcher_wrap li.Horizontal').click(function () { $('.sidebar').addClass('hide_vertical_menu'); $('.main_content ').addClass('main_content_padding_hide'); $('.horizontal_menu').addClass('horizontal_menu_active'); $('.main_content_iner').addClass('main_content_iner_padding'); $('.footer_part').addClass('pl-0'); }); $('.switcher_wrap li.vertical').click(function () { $('.sidebar').removeClass('hide_vertical_menu'); $('.main_content ').removeClass('main_content_padding_hide'); $('.horizontal_menu').removeClass('horizontal_menu_active'); $('.main_content_iner').removeClass('main_content_iner_padding'); $('.footer_part').removeClass('pl-0'); }); $('.switcher_wrap li').click(function () { $('li').removeClass("active"); $(this).addClass("active"); }); $('.custom_lms_choose li').click(function () { $('li').removeClass("selected_lang"); $(this).addClass("selected_lang"); }); $('.spin_icon_clicker').on('click', function (e) { $('.switcher_slide_wrapper').toggleClass("swith_show"); e.preventDefault(); }); $(document).ready(function () { $(function () { "use strict"; $(".pCard_add").click(function () { $(".pCard_card").toggleClass("pCard_on"); $(".pCard_add i").toggleClass("fa-minus"); }); }); });
}(jQuery));


fetch('layout.html')
    .then(response => response.text())
    .then(data => {
        var myDiv = document.createElement("div");
        myDiv.innerHTML = data

        document.getElementById('sidebar').innerHTML = myDiv.querySelector('#lsidebar').innerHTML;
        document.querySelector('.container-fluid.g-0').innerHTML = myDiv.querySelector('#lheader').innerHTML;
        document.querySelector('.footer_iner.text-center').innerHTML = `<p>2023 © CiyaTrip - Thiết kế bởi <a href="#"> Nhóm 9 </a></p>`

        if (window.location.href.includes('index.html')) document.getElementById('sidebar__index').classList.add('mm-active')
        else if (window.location.href.includes('tour.html')) document.getElementById('sidebar__recipes').classList.add('mm-active')
        else if (window.location.href.includes('booking.html')) document.getElementById('sidebar__booking').classList.add('mm-active')
        else if (window.location.href.includes('comments.html')) document.getElementById('sidebar__comments').classList.add('mm-active')
        else if (window.location.href.includes('user.html')) document.getElementById('sidebar__user').classList.add('mm-active')

        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length === 2) return parts.pop().split(";").shift();
        }

        if (getCookie("admin")) {
            document.querySelector('div.profile_info').style.display = 'block'
        } else if(!window.location.href.includes('login.html')){
            window.location.href="login.html"
        }
    });


document.addEventListener('DOMContentLoaded', function () {
    if (window.location.href.includes("tour.html")) {
        fetch('../backend/get_data.php?table=tour')
            .then(response => response.json())
            .then(data => {
                DivtoClone = document.querySelector('.recipes_table tbody tr').cloneNode(true)
                document.querySelector('.recipes_table tbody tr').remove()

                data.forEach(item => {
                    var cloneDiv = DivtoClone.cloneNode(true);
                    var td = cloneDiv.querySelectorAll('td')
                    td[0].textContent = item.id
                    td[1].querySelector('img').src = item.img
                    td[1].querySelector('.flex-grow-1').textContent = item.title
                    td[2].textContent = item.city
                    let datein = item.datein.split('-')
                    let dateout = item.dateout.split('-')
                    td[3].textContent = `${datein[2]}/${datein[1]} -> ${dateout[2]}/${dateout[1]}`
                    td[4].querySelector('a').textContent = parseInt(item.price).toLocaleString() + "₫"
                    td[5].querySelector('.tour__edit').setAttribute('item_data', JSON.stringify(item))
                    td[5].querySelector('.tour__del').href=`../backend/delete.php?table=tour&id=${item.id}&href=../dashboard/tour.html`
                    document.querySelector('.recipes_table tbody').appendChild(cloneDiv);
                })

                document.querySelectorAll('.tour__edit').forEach(e => {
                    e.addEventListener('click', () => {
                        var item = JSON.parse(e.getAttribute('item_data'));
                        document.querySelector('.modal-content').classList.remove('d-none')
                        document.querySelector('.modal-content .modal-title').textContent='Sửa tour: '+item.title
                        var input = document.querySelectorAll('.modal-content input')
                        input[0].value=item.title
                        input[1].value=item.city
                        input[2].value=item.address
                        input[3].value=item.img
                        input[4].value=item.price
                        input[5].value=item.datein
                        input[6].value=item.dateout
                        var trip = item.trip.split('|*')
                        input[7].value = trip[0]
                        input[8].value = trip[1]
                        document.querySelector('textarea').value=item.detail
                        document.querySelector('.form__data').href ='../backend/edit.php?tour='+item.id
                        document.querySelector('.modal-content').scrollIntoView({ behavior: 'smooth' });
                    })
                })
            })

    }
});

