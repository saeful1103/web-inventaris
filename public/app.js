async function muatData() {
    const res = await fetch('/api/barang');
    const data = await res.json();
    document.getElementById('tabel-body').innerHTML = data.map(b => `
        <tr><td>${b.brand}</td><td>${b.part_number}</td><td>${b.nama}</td><td>${b.stok_awal}</td>
        <td>${b.uom}</td><td>${b.note}</td><td>${b.stok_akhir}</td></tr>`).join('');
}

async function simpan() {
    const data = {
        brand: document.getElementById('brand').value,
        part_number: document.getElementById('part').value,
        nama: document.getElementById('nama').value,
        stok_awal: document.getElementById('stok').value,
        uom: document.getElementById('uom').value,
        note: document.getElementById('note').value
    };
    await fetch('/api/tambah', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)});
    muatData();
}
muatData();