async function getData(limit,page){
    const skip=limit * (page-1);
    const resopnse =await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    const data= await resopnse.json();
    return data;
}

async function displayData(limit,page=1){
    const data=await getData(limit,page);
    const products= data.products;
    const total=data.total;
    const pagination=document.querySelector('nav .pagination');
    pagination.innerHTML=`<li class="page-item"><a class="page-link" href="#" onclick='displayData(${limit},${page-1})'>Previous</a></li>`;
    for(let i=1 ;i<=total/limit;i++){
        pagination.innerHTML+=`
        <li class="page-item"><a class="page-link" href="#" onclick='displayData(${limit},${i})'>${i}</a></li>
        `;
    }
    pagination.innerHTML+=`<li class="page-item"><a class="page-link" href="#" onclick='displayData(${limit},${page+1})'>Next</a></li>`;
    const result = products.map((e)=>`
    <div class="col-12 col-lg-3">
            <div class="product">
                <img src="${e.thumbnail}" alt="">
                <h2>${e.title}</h2>
            </div>
    </div>
    `).join('');
    if(page==1){
        document.querySelector('nav .pagination li:first-child').classList.add('disabled');
      
    }
    else if(page == total/limit ){
        document.querySelector('nav .pagination li:last-child').classList.add('disabled');
    }
    else{
        document.querySelector('nav .pagination li:first-child').classList.remove('disabled');
        document.querySelector('nav .pagination li:last-child').classList.remove('disabled');
    }
    document.querySelector(`nav .pagination li:nth-child(${page+1}) a`).classList.add('bg-warning')

    document.querySelector('.products .row').innerHTML=result;
}


displayData(10);
