<?php
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        // Conectar MySQL
        $mysqli = new mysqli("mysql", "root", "rootpass", "myapp");

        // Check connection
        if ($mysqli->connect_error) {
            die("Connection failed: " . $mysqli->connect_error);
        }
        // Get datos del formulario
        $deptno = (int)$_POST['deptno'];
        $deptname = $_POST['deptname'];
        $deptbuget = (int)$_POST['deptbudget'];
        $deptloc = $_POST['deptloc'];
        $deptsal = $_POST['deptsal'];

        // Preparar stored procedure (it has 5 parameters)
        $stmt = $mysqli->prepare("CALL usp_upsert_departamentos(?, ?, ?, ?, ?)");
        echo "Mandando:" . $deptloc;

        // Enlazar parametros
        $stmt->bind_param("isisi", $deptno, $deptname, $deptbuget, $deptloc, $deptsal);

        // Ejecutar
        if ($stmt->execute()) {
            echo "Department inserted/updated successfully!";
        } else {
            echo "Error executing procedure: " . $stmt->error;
        }

        // Cerrar stmt
        $stmt->close();
        $mysqli->close();

    }


// Close MySQL
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form PHP</title>
<style>
.formul {
    display: flex;
    flex-direction: "column"
    /* padding: 10px; */
}
</style>
</head>
<body>
    <h2>Deparment data</h2>

    <form id="formul" method="POST" action="">
        <label for="deptno">Dept Nr.:</label>
        <input type="text" id="deptno" name="deptno" required> <br>
        <label for="deptname">Name:</label>
        <input type="text" id="deptname" name="deptname" required> <br>
        <label for="deptbudget">Budget:</label>
        <input type="text" id="deptbudget" name="deptbudget" required> <br>
        <label for="deptloc">Location:</label>
        <input type="text" id="deptloc" name="deptloc" required> <br>
        <label for="deptsal">Salary:</label>
        <input type="text" id="deptsal" name="deptsal" required> <br>
        <button type="submit">Submit</button>
    </form>
</body>
</html>