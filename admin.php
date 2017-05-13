<?php 

	$servername = "localhost";
	$username = "root";
	$password = "";
	$database = "mydb";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $database);

	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 
	mysqli_query($conn,"SET NAMES 'UTF8'");

	// if (isset($_POST['id'] && isset($_POST['table'])) {

	// }

	class User {
		public $userId;
		public $userName;
		public $fullName;
		public $email;
		public $password;
		public $sex;
		public $birthday;
		public $createDay;
		public $updateDay;
		public $levelGame;
		public $score;

		public static function fetchAll()
		{
			// Check connection

			global $conn;
			if ($conn == null ) {
				echo "Connect erro";
			}
			if ($conn->connect_error) {
			    die("Connection failed: " . $conn->connect_error);
			} 

			$sql = "SELECT * FROM user";
			$result = $conn->query($sql);

			$userList = array();

			if ($result->num_rows > 0) {
			    // output data of each row
			    
			    while($row = $result->fetch_assoc()) {
			    	$user = new User();
			    	$user->userId = $row["iduser"];
			    	$user->userName = $row["userName"];
			 		$user->fullName = $row["fullName"];
			 		$user->email = $row["email"];
		 			$user->password = $row["password"];
		 			$user->sex = $row["sex"];
		 			$user->birthday = $row["birthday"];
					$user->createDay = $row["createDay"];
		 			$user->updateDay = $row["updateDay"];
	 				$user->levelGame = $row["levelGame"];
		 			$user->score = $row["score"];

			       	$userList[] = $user;
			    }
			    return $userList;
			} else {
			    echo "0 results";
			}
		}
	}
	
	class Music {
		public $musicId;
		public $musicName;
		public $musicLink;
		public $nodesLink;
		public $hard;

		// public static function remove($id) {
		// 	global $conn;
		// 	$conn->
		// }

		public static function fetchAll()
		{
			// Check connection

			global $conn;
			if ($conn == null ) {
				echo "Connect erro";
			}
			if ($conn->connect_error) {
			    die("Connection failed: " . $conn->connect_error);
			} 

			$sql = "SELECT * FROM music";
			$result = $conn->query($sql);

			$musicList = array();

			if ($result->num_rows > 0) {
			    // output data of each row
			    
			    while($row = $result->fetch_assoc()) {
			    	$music = new Music();
			    	$music->musicId = $row["musicId"];
			    	$music->musicName = $row["musicName"];
			       	$music->musicLink = $row["musicName"];
			       	$music->nodesLink = $row["nodesLink"];
			        $music->hard = $row["hardLevel"];

			       	$musicList[] = $music;
			    }
			    return $musicList;
			} else {
			    echo "0 results";
			}
		}
	}

	class Beat {
		public $beatId;
		public $music_musicId;
		public $updateBeatDay;
		public $user_iduser;


		public static function fetchAll()
		{
			// Check connection

			global $conn;
			if ($conn == null ) {
				echo "Connect erro";
			}
			if ($conn->connect_error) {
			    die("Connection failed: " . $conn->connect_error);
			} 

			$sql = "SELECT * FROM beat";
			$result = $conn->query($sql);

			$beatList = array();

			if ($result->num_rows > 0) {
			    // output data of each row
			    
			    while($row = $result->fetch_assoc()) {
			    	$beat = new Beat();
			    	$beat->beatId = $row["beatId"];
			    	$beat->music_musicId = $row["music_musicId"];
			 		$beat->updateBeatDay = $row["updateBeatDay"];
			 		$beat->user_iduser = $row["user_iduser"];

			       	$beatList[] = $beat;
			    }
			    return $beatList;
			} else {
			    echo "0 results";
			}
		}
	}

	class Challenge {
		public $challengeId;
		public $challengeLevel;
		public $music_musicId;
		public $score1;
		public $score2;
		public $userName1;
		public $userName2;


		public static function fetchAll()
		{
			// Check connection

			global $conn;
			if ($conn == null ) {
				echo "Connect erro";
			}
			if ($conn->connect_error) {
			    die("Connection failed: " . $conn->connect_error);
			} 

			$sql = "SELECT * FROM challenge";
			$result = $conn->query($sql);

			$challengeList = array();

			if ($result->num_rows > 0) {
			    // output data of each row
			    
			    while($row = $result->fetch_assoc()) {
			    	$challenge = new Challenge();
			    	$challenge->challengeId = $row["challengeId"];
			    	$challenge->challengeLevel = $row["challengeLevel"];
			 		$challenge->music_musicId = $row["music_musicId"];
			 		$challenge->score1 = $row["score1"];
		 			$challenge->score2 = $row["score2"];
		 			$challenge->userName1 = $row["userName1"];
		 			$challenge->userName2 = $row["userName2"];

			       	$challengeList[] = $challenge;
			    }
			    return $challengeList;
			} else {
			    echo "0 results";
			}
		}
	}


	class Feedback {
		public $idfeedback;
		public $fbTitle;
		public $fbContent;
		public $fbDate;
		public $user_iduser;

		public static function fetchAll()
		{
			// Check connection

			global $conn;
			if ($conn == null ) {
				echo "Connect erro";
			}
			if ($conn->connect_error) {
			    die("Connection failed: " . $conn->connect_error);
			} 

			$sql = "SELECT * FROM feedback";
			$result = $conn->query($sql);

			$feedbackList = array();

			if ($result->num_rows > 0) {
			    // output data of each row
			    
			    while($row = $result->fetch_assoc()) {
			    	$feedback = new Challenge();
			    	$feedback->idfeedback = $row["idfeedback"];
			    	$feedback->fbTitle = $row["fbTitle"];
			 		$feedback->fbContent = $row["fbContent"];
			 		$feedback->fbDate = $row["fbDate"];
		 			$feedback->user_iduser = $row["user_iduser"];

			       	$feedbackList[] = $feedback;
			    }
			    return $feedbackList;
			} else {
			    echo "0 results";
			}
		}
	}

	class Historytransaction {
		public $htId;
		public $hisName;
		public $hisValue;
		public $hisDate;
		public $user_iduser;

		public static function fetchAll()
		{
			// Check connection

			global $conn;
			if ($conn == null ) {
				echo "Connect erro";
			}
			if ($conn->connect_error) {
			    die("Connection failed: " . $conn->connect_error);
			} 

			$sql = "SELECT * FROM historytransaction";
			$result = $conn->query($sql);

			$htList = array();

			if ($result->num_rows > 0) {
			    // output data of each row
			    
			    while($row = $result->fetch_assoc()) {
			    	$ht = new Historytransaction();
			    	$ht->htId = $row["htId"];
			    	$ht->hisName = $row["hisName"];
			 		$ht->hisValue = $row["hisValue"];
			 		$ht->hisDate = $row["hisDate"];
		 			$ht->user_iduser = $row["user_iduser"];

			       	$htList[] = $ht;
			    }
			    return $htList;
			} else {
			    echo "0 results";
			}
		}
	}

 ?>


<!DOCTYPE html>
<html>
<head>
	<title></title>
	<style type="text/css">
		table {
		    border-collapse: collapse;
		    margin: auto;
		}

		table, th, td {
		    border: 1px solid black;
		}
		h1 {
			text-align: center;
		}
	</style>
</head>
<body>
<h1>User</h1>
<table>
	<tr>
		<th>ID</th>
		<th>User Name</th>
		<th>Full Name</th>
		<th>Email</th>
		<th>Password</th>
		<th>Sex</th>
		<th>Birthday</th>
		<th>Create Day</th>
		<th>Update Day</th>
		<th>Level Game</th>
		<th>Score</th>
	</tr>
	<?php $userList = User::fetchAll(); foreach ($userList as $value): ?>
	<tr>
		<td><?php echo $value->userId ?></td>
		<td><?php echo $value->userName ?></td>
		<td><?php echo $value->fullName ?></td>
		<td><?php echo $value->email ?></td>
		<td><?php echo $value->password ?></td>
		<td><?php echo $value->sex ?></td>
		<td><?php echo $value->birthday ?></td>
		<td><?php echo $value->createDay ?></td>
		<td><?php echo $value->updateDay ?></td>
		<td><?php echo $value->levelGame ?></td>
		<td><?php echo $value->score ?></td>
	</tr>
	<?php endforeach ?>

</table>

<h1>Music</h1>
<table >
<tr>
	<th>ID</th>
	<th>Name</th>
	<th>Link</th>
	<th>NodeLink</th>
	<th>Level</th>
</tr>
	<?php $musicList = Music::fetchAll(); foreach ($musicList as $value): ?>
	<tr>
		<td><?php echo $value->musicId ?></td>
		<td><?php echo $value->musicName ?></td>
		<td><?php echo $value->musicLink ?></td>
		<td><?php echo $value->nodesLink ?></td>
		<td><?php echo $value->hard ?></td>
	</tr> 
	<?php endforeach ?>

</table>

<h1>Beat</h1>
<table>
	<tr>
		<th>ID</th>
		<th>ID Musuc</th>
		<th>Update Day</th>
		<th>User ID</th>
	</tr>
	<?php $beatList = Beat::fetchAll(); foreach ($beatList as $value): ?>
	<tr>
		<td><?php echo $value->beatId ?></td>
		<td><?php echo $value->music_musicId ?></td>
		<td><?php echo $value->updateBeatDay ?></td>
		<td><?php echo $value->user_iduser ?></td>
	</tr>
	<?php endforeach ?>
</table>

<h1>Challenge</h1>

<table>
	<tr>
		<th>ID</th>
		<th>Level</th>
		<th>Music ID</th>
		<th>Score 1</th>
		<th>Score 2</th>
		<th>User Name 1</th>
		<th>User Name 2</th>
	</tr>
	<?php $challengeList = Challenge::fetchAll(); foreach ($challengeList as $value): ?>
	<tr>
		<td><?php echo $value->challengeId ?></td>
		<td><?php echo $value->challengeLevel ?></td>
		<td><?php echo $value->music_musicId ?></td>
		<td><?php echo $value->score1 ?></td>
		<td><?php echo $value->score2 ?></td>
		<td><?php echo $value->userName1 ?></td>
		<td><?php echo $value->userName2 ?></td>
	</tr>
	<?php endforeach ?>
</table>

<h1>Feedback</h1>
<table>
	<tr>
		<th>ID</th>
		<th>Title</th>
		<th>Content</th>
		<th>Date</th>
		<th>User ID</th>
	</tr>
	<?php $feedbackList = Feedback::fetchAll(); foreach ($feedbackList as $value): ?>
	<tr>
		<td><?php echo $value->idfeedback ?></td>
		<td><?php echo $value->fbTitle ?></td>
		<td><?php echo $value->fbContent ?></td>
		<td><?php echo $value->fbDate ?></td>
		<td><?php echo $value->user_iduser ?></td>
	</tr>
	<?php endforeach ?>
</table>

<h1>History Transaction</h1>

<table>
	<tr>
		<th>ID</th>
		<th>Title</th>
		<th>Content</th>
		<th>Date</th>
		<th>User ID</th>
	</tr>
	<?php $htList = Historytransaction::fetchAll(); foreach ($htList as $value): ?>
	<tr>
		<td><?php echo $value->htId ?></td>
		<td><?php echo $value->hisName ?></td>
		<td><?php echo $value->hisValue ?></td>
		<td><?php echo $value->hisDate ?></td>
		<td><?php echo $value->user_iduser ?></td>
	</tr>
	<?php endforeach ?>
	
</table>
</body>
</html>