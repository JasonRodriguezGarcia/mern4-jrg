<?php
// Conectar MySQL
$mysqli = new mysqli("mysql", "root", "rootpass", "myapp");

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Handle POST delete request
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    if (isset($_POST['delete_id'])) {
        $delete_id = (int)$_POST['delete_id'];

        // Llamar el procedimiento almacenado
        // Preparar stored procedure (it has 5 parameters)
        $stmt = $mysqli->prepare("CALL usp_delete_departamento(?)");
        
        // Enlazar parametros
        $stmt->bind_param("i", $delete_id);

        // Ejecutar
        if ($stmt->execute()) {
            echo "Department deleted successfully!";
        } else {
            echo "Error executing procedure: " . $stmt->error;
        }

        // Cerrar stmt
        $stmt->close();
 
    }
}

// Conseguir datos para mostrar
$result = $mysqli->query("SELECT deptno, deptname, deptbudget, deptloc, deptsal FROM departamentos ORDER BY deptno ASC");



?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <table border="1" cellpadding="8" cellspacing="0">
    <tr><th>ID</th><th>Name</th><th>Budget</th><th>Location</th><th>Salary</th><th>Action</th></tr>

    <?php while ($row = $result->fetch_assoc()) : ?>
        <tr>
            <td><?= htmlspecialchars($row['deptno']) ?></td>
            <td><?= htmlspecialchars($row['deptname']) ?></td>
            <td><?= htmlspecialchars($row['deptbudget']) ?></td>
            <td><?= htmlspecialchars($row['deptloc']) ?></td>
            <td><?= htmlspecialchars($row['deptsal']) ?></td>
            <td>
                <!-- Encrustamos un formulario con un botón hidden -->
                <form method="post" action="" style="display:inline;" onsubmit="return confirm('Delete this user?');">
                    <input type="hidden" id="delete_id" name="delete_id" value="<?= $row['deptno'] ?>">
                    <input type="submit" value="Delete">
                </form>
            </td>
            
        </tr>
    <?php endwhile; ?>
</table>
</body>
</html>

<!-- pasa siempre por aqui, sea un get o un post -->
<?php
    // cerrar sesion
    $mysqli->close();
?>