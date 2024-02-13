async function getData(limit, page) {
    const skip = limit * (page - 1);
    const resopnse = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    const data = await resopnse.json();
    return data;
}

async function displayData(limit, page = 1) {
    const data = await getData(limit, page);
    const products = data.products;
    const total = data.total;
    const pagination = document.querySelector('nav ul.pagination');
    pagination.innerHTML = `<li class="page-item"><a class="page-link" href="#" onclick='displayData(${limit},${page - 1})'>Previous</a></li>`;
    for (let i = 1; i <= total / limit; i++) {
        pagination.innerHTML += `
        <li class="page-item"><a class="page-link" href="#" onclick='displayData(${limit},${i})'>${i}</a></li>
        `;
        if (i == 1 || i == (total / limit) - 1) {
            pagination.innerHTML += `<li class="page-item dots" style='display:none'><a class="page-link" href="#"  >...</a></li>`;

        }
    }
    pagination.innerHTML += `<li class="page-item"><a class="page-link" href="#" onclick='displayData(${limit},${page + 1})'>Next</a></li>`;
    const result = products.map((e) => `
    <div class="col-12 col-lg-3">
            <div class="product">
                <img src="${e.thumbnail}" alt="">
                <h2>${e.title}</h2>
            </div>
    </div>
    `).join('');
    //disable the Previous and Next items when there is no more pages to move to.
    if (page == 1) {
        document.querySelector('nav .pagination li:first-child').classList.add('disabled');

    }
    else if (page == total / limit) {
        document.querySelector('nav .pagination li:last-child').classList.add('disabled');
    }
    else {
        document.querySelector('nav .pagination li:first-child').classList.remove('disabled');
        document.querySelector('nav .pagination li:last-child').classList.remove('disabled');
    }

    //hide pagination items when totalPages greater than 10 and display the dots items
    if (total / limit > 10) {
        const items = document.querySelectorAll('.page-item');
        for (let i = 2; i < items.length - 2; i++) {
            if (i - 1 != page && i - 1 != page - 1 && i - 1 != page + 1) {
                items[i].style.display = 'none';
            }
        }

        const dots = document.querySelectorAll('.dots');
        if (page > 3) {
            dots[0].style.display = 'inline-block';
        }
        if (page < (total / limit) - 2) {
            dots[1].style.display = 'inline-block';
        }
    }

    //change pagination item backgroundColor
    if (page == 1) {
        document.querySelector(`nav .pagination li:nth-child(2) a`).classList.add('bg-warning')
    }
    else if (page == total / limit) {
        document.querySelector(`nav .pagination li:nth-child(${(total / limit) + 3}) a`).classList.add('bg-warning')
    }
    else {
        document.querySelector(`nav .pagination li:nth-child(${page + 2}) a`).classList.add('bg-warning')
    }

    document.querySelector('.products .row').innerHTML = result;
}

displayData(5);
