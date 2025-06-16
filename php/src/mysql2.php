<?php
// Connect to MySQL
$mysqli = new mysqli("mysql", "user", "userpass", "myapp");

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Query the database
$result = $mysqli->query("SELECT deptno, deptname, deptbudget, deptloc FROM departamentos");

if (!$result) {
    die("Query error: " . $mysqli->error);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Test Table Data</title>
    <style>
        table { border-collapse: collapse; width: 50%; margin: 20px auto; }
        th, td { border: 1px solid #aaa; padding: 8px; text-align: left; }
    </style>
</head>
<body>
    <h2 style="text-align:center;">Test Table Data</h2>
    <table>
        <tr>
            <th>ID</th>
            <th>Value</th>
            <th>Budget</th>
            <th>Location</th>
        </tr>
        <?php while($row = $result->fetch_assoc()): ?>
        <tr>
            <td><?= htmlspecialchars($row['deptno']) ?></td>
            <td><?= htmlspecialchars($row['deptname']) ?></td>
            <td><?= htmlspecialchars($row['deptbudget']) ?></td>
            <td><?= htmlspecialchars($row['deptloc']) ?></td>
        </tr>
        <?php endwhile; ?>
    </table>
</body>
</html>

<?php
$mysqli->close();
?>