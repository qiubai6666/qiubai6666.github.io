<script>
<!--
document.write(unescape("self.onmessage%20%3D%20function%28e%29%20%7B%0A%20%20%20%20if%20%28e.data.action%20%3D%3D%3D%20%27start%27%29%20%7B%0A%20%20%20%20%20%20%20%20const%20duration%20%3D%20e.data.duration%3B%0A%20%20%20%20%20%20%20%20setTimeout%28%28%29%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20self.postMessage%28%27timeout%27%29%3B%0A%20%20%20%20%20%20%20%20%7D%2C%20duration%29%3B%0A%20%20%20%20%7D%0A%7D%3B"));
//-->
</script>
