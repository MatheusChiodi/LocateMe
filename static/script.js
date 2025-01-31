function capturarLocalizacao() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async function (position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

      // Enviar localização para o servidor Flask
      await fetch('/rastrear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude, longitude }),
      });

      alert('Localização enviada com sucesso!');
    });
  } else {
    alert('Geolocalização não suportada no seu navegador!');
  }
}
