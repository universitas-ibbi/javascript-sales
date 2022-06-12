let sales = [];

let statusRubah = false;
let indexRubah;

[...document.querySelectorAll("input[type=number]:not(:disabled)")].map(input => {
    input.addEventListener("input", () => {
        const txtQty = document.getElementById("txtQty");
        const txtHarga = document.getElementById("txtHarga");
        const txtTotal = document.getElementById("txtTotal");

        txtTotal.value = txtQty.value * txtHarga.value;
    })
})

document.getElementById("btnTambah").addEventListener("click",() => {
    const txtNama = document.getElementById("txtNama");
    const txtQty = document.getElementById("txtQty");
    const txtHarga = document.getElementById("txtHarga");
    const txtTotal = document.getElementById("txtTotal");

    if(statusRubah === true){
        sales[indexRubah] = {
            ...sales[indexRubah],
            nama: txtNama.value,
            qty: txtQty.value,
            harga: Number(txtHarga.value)
        };
    }else{
        //menyimpan data yang diinput ke dalam array
        sales.push({
            nama: txtNama.value,
            qty: txtQty.value,
            harga: Number(txtHarga.value)
        });
    }

    tampilTabel();

    txtNama.value = "";
    txtQty.value = "";
    txtHarga.value = "";
    txtTotal.value = "";

    localStorage.setItem("sales",JSON.stringify(sales));

    statusRubah = false;
});

function tampilTabel(){
    const table = document.getElementsByTagName("table")[0];
    const tbody = document.createElement("tbody");
    let tableContent = "";
    let grandTotal = 0;

    table.lastChild.remove(); //remove tfoot
    table.lastChild.remove(); //remote tbody

    sales.map((data,index) => {
        const total = data.qty * data.harga;
        grandTotal+= total;

        tableContent +=  `<tr>
                                <td>${data.nama}</td>
                                <td class="text-center">${data.qty}</td>
                                <td class="text-end">${data.harga.toLocaleString('en-US',{style: 'currency', currency: 'IDR'})}</td>
                                <td class="text-end">${total.toLocaleString('en-US',{style: 'currency',currency: 'IDR'})}</td>
                                <td><button class="btn btn-warning w-100" onclick="rubahSales(${index})">Rubah</button></td>
                                <td><button class="btn btn-danger w-100" onclick="hapusSales(${index})">Hapus</button></td>
                            </tr>`;
    });
    tbody.innerHTML = tableContent;
    table.append(tbody);

    const tfoot = document.createElement("tfoot");
    tfoot.innerHTML = `
        <tr>
            <td colspan=3>Grand Total</td>
            <td class="text-end">${grandTotal.toLocaleString('en-US',{style: 'currency',currency: 'IDR'})}</td>
        <tr>
    `;
    table.append(tfoot);
}

function hapusSales(index){
    sales.splice(index,1);

    localStorage.setItem("sales",JSON.stringify(sales));

    tampilTabel();
}

function rubahSales(index){
    const txtNama = document.getElementById("txtNama");
    const txtQty = document.getElementById("txtQty");
    const txtHarga = document.getElementById("txtHarga");
    const txtTotal = document.getElementById("txtTotal");

    txtNama.value = sales[index].nama;
    txtQty.value = sales[index].qty;
    txtHarga.value = sales[index].harga;
    txtTotal.value  = sales[index].qty * sales[index].harga;

    statusRubah = true;
    indexRubah = index;
}

document.addEventListener("DOMContentLoaded",() => {
    sales  = JSON.parse(localStorage.getItem("sales"));

    tampilTabel();
})