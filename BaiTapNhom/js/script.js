// Hàm lấy giá trị của cookie
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

var error = new URLSearchParams(window.location.search).get('error');
if (error === "true") {
    alert("Sai tài khoản mật khẩu!");
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('layout.html')
        .then(response => response.text())
        .then(data => {
            var div = document.createElement('div')
            div.innerHTML = data
            document.querySelector('header.header').innerHTML = div.querySelector('header.header').innerHTML
            document.querySelector('footer.footer').innerHTML = div.querySelector('footer.footer').innerHTML

            if (window.location.href.includes('index.html')) document.querySelector('a[href="index.html"].nav-link').parentNode.classList.add('active')
            if (window.location.href.includes('tour-search.html')) document.querySelector('a[href="tour-search.html"].nav-link').parentNode.classList.add('active')
            // if (window.location.href.includes('portfolio-4-masonry.html')) document.querySelector('a[href="portfolio-4-masonry.html"].nav-link').parentNode.classList.add('active')

            if (getCookie('user_id')) {
                document.querySelector('a[href="sign-in.html"]').classList.add('d-none')
                document.querySelector('h5.user_name').classList.remove('d-none')
                document.querySelector('h5.user_name strong').textContent = "Xin chào, " + decodeURIComponent(getCookie('name'))
            } else {
                document.querySelector('a[href="sign-in.html"]').classList.remove('d-none')
                document.querySelector('h5.user_name').classList.add('d-none')
            }
        })

    if (window.location.href.includes('tour-search.html')) {
        function truncateStringByWords(str, maxWords) {
            // Tách chuỗi thành mảng các từ
            var words = str.split(' ');
            // Kiểm tra số từ
            if (words.length > maxWords) {
                // Nếu có nhiều hơn maxWords từ, cắt và thêm "..."
                var truncatedString = words.slice(0, maxWords).join(' ') + '...';
                return truncatedString;
            } else {
                // Nếu không, giữ nguyên chuỗi
                return str;
            }
        }

        // show danh sách tour 
        fetch('backend/get_data.php?table=tour')
            .then(response => response.json())
            .then(data => {
                document.querySelector('.col-lg-8.mb-3.mb-lg-0 p').textContent = `Tìm thấy ${data.length} kết quả`
                var divtoClone = document.querySelector('.tour__list .tour__info').cloneNode(true)
                document.querySelector('.tour__list .tour__info').remove()

                function filter_tour(d) {
                    d.forEach(item => {
                        var cloneDiv = divtoClone.cloneNode(true)
                        cloneDiv.querySelector('img').src = item.img
                        cloneDiv.querySelector('h5 a').href = `tour-detail.html?id=` + item.id
                        cloneDiv.querySelector('.btn.btn-link.mt-2').href = `tour-detail.html?id=` + item.id
                        cloneDiv.querySelector('h5 a').textContent = truncateStringByWords(item.title, 18);
                        cloneDiv.querySelector('h5 a').title = item.title;
                        let date = item.datein.split('-')
                        cloneDiv.querySelector('.date.me-3 span').textContent = `${date[2]}/${date[1]}`
                        cloneDiv.querySelector('.listing-loaction').innerHTML += item.city
                        cloneDiv.querySelector('.tour__price').textContent = (parseInt(item.price) / 1000).toLocaleString() + 'K'
                        document.querySelector('.tour__list').appendChild(cloneDiv)
                    });
                }
                filter_tour(data)

                var data_sort = [...data]

                document.querySelector('.sort_by').addEventListener('change', () => {
                    document.querySelector('.tour__list').innerHTML = ''
                    if (document.querySelector('.sort_by').value == 'price_max') {
                        filter_tour(data_sort.sort((a, b) => {
                            return b.price - a.price
                        }))
                    } else if (document.querySelector('.sort_by').value == 'price_min') {
                        filter_tour(data_sort.sort((a, b) => {
                            return a.price - b.price
                        }))
                    } else {
                        filter_tour(data_sort)
                    }
                })

                document.querySelector('.city').addEventListener('change', () => {
                    document.querySelector('.tour__list').innerHTML = ''
                    if (document.querySelector('.city').value == '0')
                        data_sort = [...data]
                    else {
                        data_sort = data.filter(item => {
                            console.log(item.city.toLowerCase(), document.querySelector('.city').value.toLowerCase())
                            return item.city.toLowerCase() == document.querySelector('.city').value.toLowerCase()
                        })
                    }
                    if (document.querySelector('.sort_by').value == 'price_max') {
                        filter_tour(data_sort.sort((a, b) => {
                            return b.price - a.price
                        }))
                    } else if (document.querySelector('.sort_by').value == 'price_min') {
                        filter_tour(data_sort_sort.sort((a, b) => {
                            return a.price - b.price
                        }))
                    } else {
                        filter_tour(data_sort)
                    }
                })
            })

        // show danh sách danh mục 
        fetch('backend/get_data.php?table=category')
            .then(response => response.json())
            .then(data => {
                var divtoClone = document.querySelector('.category li').cloneNode(true)
                document.querySelector('.category li').remove()
                data.forEach(item => {
                    var cloneDiv = divtoClone.cloneNode(true)
                    cloneDiv.querySelector('a').textContent = item.name
                    cloneDiv.setAttribute('cate_id', item.id)
                    document.querySelector('.category').appendChild(cloneDiv)
                });
            })

        // show danh sách thành phố 
        fetch('backend/get_data.php?table=city')
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    var option = document.createElement('option')
                    option.value = item.city.toLowerCase()
                    option.classList.add('text-capitalize')
                    option.textContent = item.city
                    document.querySelector('select.city').appendChild(option)
                });
            })
    }

    if (window.location.href.includes('tour-detail.html')) {
        var id = new URLSearchParams(window.location.search).get('id')

        fetch('backend/get_data.php?table=tour&id=' + id)
            .then(response => response.json())
            .then(data => {
                item = data[0]
                document.querySelector('.title.mb-0').textContent = item.title
                let datein = item.datein.split('-')
                let dateout = item.dateout.split('-')
                document.querySelector('.date.me-3 span').textContent = (`${datein[2]}/${datein[1]} ➦ ${dateout[2]}/${dateout[1]}`)
                document.querySelector('.listing-loaction strong').textContent = item.address
                document.querySelector('.price h5').textContent = parseInt(item.price).toLocaleString() + ' VNĐ'
                document.querySelector('.listing-image img').src = item.img
                document.querySelector('.tour__detail p').textContent = item.detail
                document.querySelector('a[href="booking.html"]').href = 'booking.html?id=' + id
                var divtoClone = document.querySelector('#accordionExample .accordion-item').cloneNode(true)
                document.querySelector('#accordionExample .accordion-item').remove()
                item.trip.split('||').forEach((element, i) => {
                    console.log(element, i)
                    var cloneDiv = divtoClone.cloneNode(true)
                    cloneDiv.innerHTML = cloneDiv.innerHTML.replace(/heading/g, 'heading' + i);
                    cloneDiv.innerHTML = cloneDiv.innerHTML.replace(/collapseOne/g, 'collapseOne' + i);
                    if (i == 0) {
                        cloneDiv.querySelector('.accordion-button').classList.remove('collapsed')
                        cloneDiv.querySelector('.accordion-collapse').classList.add('show')
                    }
                    let content = element.split('|*')
                    cloneDiv.querySelector('.accordion-button').textContent = content[0]
                    cloneDiv.querySelector('.col-sm-9').textContent = content[1]
                    document.querySelector('#accordionExample').appendChild(cloneDiv)
                });
            })
    }

    if (window.location.href.includes('booking.html')) {
        var id = new URLSearchParams(window.location.search).get('id')
        fetch('backend/get_data.php?table=tour&id=' + id)
            .then(response => response.json())
            .then(data => {
                var item = data[0]
                document.querySelector('.booking__info .title strong').textContent = item.title
                document.querySelector('.booking__success .title strong').textContent = item.title
                document.querySelector('.booking__success .border-radius').src = item.img
                var datein = item.datein.split('-')
                document.querySelector('.booking__datein').innerHTML += (`${datein[2]}/${datein[1]}`)

                // Chuyển đổi ngày từ chuỗi "yy-mm-dd" sang đối tượng Date
                var date1 = new Date(item.datein);
                var date2 = new Date(item.dateout);
                // Chuyển đổi thời gian thành mili giây và tính hiệu
                var timeDiff = date2 - date1;
                // Chuyển đổi kết quả từ mili giây sang số ngày
                var soNgay = Math.ceil(timeDiff / (1000 * 3600 * 24));
                document.querySelector('.booking__dateout').innerHTML += (soNgay + ' ngày')
                document.querySelector('.booking__address').innerHTML += item.address
                document.querySelector('.booking__price').innerHTML = item.price
            })
        document.querySelector('.booking__info .tour__confirm').addEventListener('click', () => {
            const form = document.getElementById('bookingForm');
            const formData = new FormData(form);

            // Tạo đối tượng cấu hình cho fetch
            const requestOptions = {
                method: 'POST',
                body: formData, // Dữ liệu của form
            };

            // Thực hiện yêu cầu fetch
            fetch('backend/add.php?booking=' + id, requestOptions)
                .then(response => response.json())
                .then(data => {
                    document.querySelector('.booking__quantity').innerHTML += data.quantity + ' người'
                    var total = parseInt(document.querySelector('.booking__price').textContent) * parseInt(data.quantity)
                    document.querySelector('.booking__price').textContent = total.toLocaleString() + ' VNĐ'

                    document.querySelector('.booking__success').classList.remove('d-none')
                    document.querySelector('.booking__info').classList.add('d-none')
                })
        })
    }

    if (window.location.href.includes('portfolio-4-masonry.html')) {
        // show danh sách thành phố 
        // fetch('backend/get_data.php?table=city')
        //     .then(response => response.json())
        //     .then(data => {
        //         var btn = document.querySelector('.btn-filter').cloneNode(true)
        //         data.forEach(item => {
        //             // console.log(item)
        //             var cloneBtn = btn.cloneNode(true)
        //             cloneBtn.textContent = item.city
        //             cloneBtn.classList.add('text-capitalize')
        //             document.querySelector('.filters-group').appendChild(cloneBtn)
        //         });
        //     })

    }
})