<?php
$servername = "localhost";
$username = "root";
$password = "12345blue";
$database = "mydb";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
mysqli_query($conn,"SET NAMES 'UTF8'");
?>