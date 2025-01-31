async function atualizarMapa() {
  let resposta = await fetch('/localizacao');
  let dados = await resposta.json();

  if (!dados.latitude || !dados.longitude) {
    alert('Nenhuma localização recebida ainda!');
    return;
  }

  let latitude = parseFloat(dados.latitude);
  let longitude = parseFloat(dados.longitude);

  let map = L.map('map').setView([latitude, longitude], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
  }).addTo(map);

  L.marker([latitude, longitude])
    .addTo(map)
    .bindPopup('Última localização rastreada')
    .openPopup();
}

atualizarMapa();
