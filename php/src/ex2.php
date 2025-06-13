<!DOCTYPE html>
<html>
<head>
    <title>Simple POST Form</title>
</head>
<body>

<h2>Submit Your Name</h2>

<form method="post" action="">
    <label for="name">Enter your name:</label>
    <input type="text" id="name" name="name" required>
    <button type="submit">Submit</button>
</form>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and get the submitted name
    $name = '';
    $name = htmlspecialchars(trim($_POST['name'] ?? ''));

    if ($name !== '') {
        echo "<h3>Hello, " . $name . "!</h3>";
    } else {
        echo "<p>Please enter a valid name.</p>";
    }
}
?>
    <button id="botonLimpiar" type="button">Limpiar pantalla</button>

</body>
<script>
    let botonLimpiar = document.getElementById("botonLimpiar")
    let nombre = document.getElementById("name")

    botonLimpiar.onclick = function () {    
        nombre.value = ""
        <?php
            $name = ''
        ?>
    }
</script>
</html>