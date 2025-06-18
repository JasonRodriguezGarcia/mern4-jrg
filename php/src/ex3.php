<!DOCTYPE html>
<html>
<head>
    <title>Simple POST Form</title>
</head>
<body>

<h2>Submit Your Name</h2>

<form method="post" action="">
    <label for="deptno">Enter your dept Nr.:</label>
    <input type="text" id="deptno" name="deptno" required> <br>
    <label for="deptname">Enter your dept name:</label>
    <input type="text" id="deptname" name="deptname" required> <br>
    <label for="deptbudget">Enter your dept budget:</label>
    <input type="text" id="deptbudget" name="deptbudget" required> <br>
    <label for="deptloc">Enter your dept location:</label>
    <input type="text" id="deptloc" name="deptloc" required> <br>
    <button type="submit">Submit</button>
</form>

<?php
echo $_SERVER["REQUEST_METHOD"];
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $deptno = $_POST['deptno'];
    $deptname = $_POST['deptname'];
    $deptbudget = $_POST['deptbudget'];
    $deptloc = $_POST['deptloc'];

    if ($deptno !== '') {
        // Connect to MySQL
        $mysqli = new mysqli("mysql", "user", "userpass", "myapp");

        // Check connection
        if ($mysqli->connect_error) {
            die("Connection failed: " . $mysqli->connect_error);
        }

        // Insert into the database
        $result = $mysqli->prepare("INSERT INTO departamentos (deptno, deptname, deptbudget, deptloc) VALUES (?, ?, ?, ?)");
        $result->bind_param("isis", $detpno, $deptname, $deptbudget, $deptloc); //s- string, i - integer para cada parametro

        if ($result->execute()) {
            echo "<h3>Departamento creado: " . $deptno . "!</h3>";
        } else {
            die("Insert error: " . $mysqli->error);
        }


    } else {
        echo "<p>Please enter a valid deptarment ID.</p>";
    }
}
?>
</body>
</html>