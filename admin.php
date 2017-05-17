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
		public $coin;
		public $phoneNumber;


		public static function remove($id) {
			global $conn;
		 	if ($conn->connect_error) {
   				die("Connection failed: " . $conn->connect_error);
			} 

			if(isset($_POST['id'])) {
				$id = $_POST['id'];
				$sql = mysql_query("DELETE FROM mods WHERE id = '$id'", $conn);
			}

			if ($conn->query($sql) === TRUE) {
			    echo "Record deleted successfully";
			} else {
			    echo "Error deleting record: " . $conn->error;
			}

			$conn->close();
		}

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
	 				$user->coin = $row["coin"];
		 			$user->phoneNumber = $row["phoneNumber"];


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
		public $author;
		public $musicLink;
		public $nodesLink;
		public $hard;
		public $count;

		public static function insert($data){
			global $conn;
			$sql = "INSERT INTO `music` (`musicId`, `musicName`, `author`, `musicLink`, `nodesLink`, `hardLevel`, `count`) VALUES (?,?,?,?,?,?,?)";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param("dssssdd", $data["musicId"],$data["musicName"],$data["author"],$data["musicLink"],$data["nodesLink"],$data["hardLevel"],$data["count"]);
			  if ($stmt->execute() == TRUE) {
			      echo "Record has been inserted successfully";
			  } else {
			    header('HTTP/1.1 400 InvalidArgumentException');
			    echo "Error insert record: " . $conn->error;
			  }
			  $stmt->close();
		}

		public static function remove($id)
		{
			global $conn;
			$stmt = $conn->prepare("DELETE FROM `music` WHERE musicId=?");
			$stmt->bind_param("d", $id);
			print_r($stmt);
			if ($stmt->execute()){
				echo "successfully";
			} else 
				{
					echo "failed";
				}
			$stmt->close();
		}

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
			    	$music->author = $row["author"];
			       	$music->musicLink = $row["musicName"];
			       	$music->nodesLink = $row["nodesLink"];
			        $music->hard = $row["hardLevel"];
			        $music->count = $row["count"];

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

		public static function remove($id)
		{
			global $conn;
			$stmt = $conn->prepare("DELETE FROM `challenge` WHERE challengeId=?");
			$stmt->bind_param("d", $id);
			print_r($stmt);
			if ($stmt->execute()){
				echo "successfully";
			} else 
				{
					echo "failed";
				}
			$stmt->close();
		}


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

		public static function remove($id)
		{
			global $conn;
			$stmt = $conn->prepare("DELETE FROM `feedback` WHERE idfeedback=?");
			$stmt->bind_param("i", $id);
			print_r($stmt);
			if ($stmt->execute()){
				echo "successfully";
			} else 
				{
					echo "failed";
				}
			$stmt->close();
		}

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

		public static function remove($id)
		{
			global $conn;
			$stmt = $conn->prepare("DELETE FROM `historytransaction` WHERE htID=?");
			$stmt->bind_param("i", $id);
			print_r($stmt);
			if ($stmt->execute()){
				echo "successfully";
			} else 
				{
					echo "failed";
				}
			$stmt->close();
		}

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

 <?php 

 	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    	if (isset($_POST["id"])) {
  
	    	$id = intval($_POST["id"]);
	    	$table_name = $_POST["table_name"];
	    	$table_name::remove($id);
	    }else {
	    	Music::insert($_POST);
	    }
    }

		//Feedback::remove($id);	

		
  ?>


<!DOCTYPE html>
<html>
<head>
	<title></title>
  	<meta charset="utf-8">
 	<meta name="viewport" content="width=device-width, initial-scale=1">
 	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<style type="text/css">
		table {
		    border-collapse: collapse;
		    margin: auto;
		    margin-top: 30px;
		    font-size: 17px;
		}

		table, th, td {
		    border: 1px solid black;
		}
		h1 {
			text-align: center;
		}
		/*tab*/
		div.tab {
		    overflow: hidden;
		    border: 1px solid #ccc;
		    background-color: #f1f1f1;
		}

		/* Style the buttons inside the tab */
		div.tab button {
		    background-color: inherit;
		    float: left;
		    border: none;
		    outline: none;
		    cursor: pointer;
		    padding: 14px 16px;
		    transition: 0.3s;
		    font-size: 18px;
		    font-weight: bold;
		}

		/* Change background color of buttons on hover */
		div.tab button:hover {
		    background-color: #ddd;
		}

		/* Create an active/current tablink class */
		div.tab button.active {
		    background-color: #ccc;
		}

		/* Style the tab content */
		.tabcontent {
		    display: none;
		    padding: 6px 12px;
		    border: 1px solid #ccc;
		    border-top: none;
		}
		#User {
			display: block;
		}
		#btn-edit-frm {
			margin-left: 650px;
			margin-top:20px;
		}
	</style>
</head>
<body>

<div class="tab">
  <button class="tablinks" onclick="openCity(event, 'User')">User</button>
  <button class="tablinks" onclick="openCity(event, 'Music')">Music</button>
  <button class="tablinks" onclick="openCity(event, 'Challenge')">Challenge</button>
  <button class="tablinks" onclick="openCity(event, 'Feedback')">Feedback</button>
  <button class="tablinks" onclick="openCity(event, 'Historytransaction')">History Transaction</button>

</div>

<div id="User" class="tabcontent">
<form action="" method="post">
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
		<th>Coin</th>
		<th>Phone Number</th>
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
		<td><?php echo $value->coin ?></td>
		<td><?php echo $value->phoneNumber ?></td>
		<td></td>
	</tr>
	<?php endforeach ?>
	
</table>
</form>
</div>

<div id="Music" class="tabcontent">
  <table >
	<tr>
		<th>ID</th>
		<th>Name</th>
		<th>Author</th>
		<th>Link</th>
		<th>NodeLink</th>
		<th>Level</th>
		<th>Count</th>
	</tr>
		<?php $musicList = Music::fetchAll(); foreach ($musicList as $value): ?>
		<tr>
			<td><?php echo $value->musicId ?></td>
			<td><?php echo $value->musicName ?></td>
			<td><?php echo $value->author ?></td>
			<td><?php echo $value->musicLink ?></td>
			<td><?php echo $value->nodesLink ?></td>
			<td><?php echo $value->hard ?></td>
			<td><?php echo $value->count ?></td>
			<form method="post" target="admin.php" class="ajax">
				<input type="hidden" name="id" value="<?php echo $value->musicId ?>">
				<input type="hidden" name="table_name" value="music">
				<td><input type="submit" name="delete_music" value="Delete"></td>
			</form>
		</tr> 
		<?php endforeach ?>
	</table>
	<button id="btn-edit-frm" class="btn btn-default">Add</button>
</div>

<div id="Challenge" class="tabcontent">
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
			<form method="post" target="admin.php" class="ajax">
				<input type="hidden" name="id" value="<?php echo $value->challengeId ?>">
				<input type="hidden" name="table_name" value="challenge">
				<td><input type="submit" name="delete_music" value="Delete"></td>
			</form>
		</tr>
		<?php endforeach ?>
	</table>
</div>

<div id="Feedback" class="tabcontent">
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
			<form method="post" target="admin.php" class="ajax">
				<input type="hidden" name="id" value="<?php echo $value->idfeedback ?>">
				<input type="hidden" name="table_name" value="feedback">
				<td><input type="submit" name="delete_music" value="Delete"></td>
			</form>
		</tr>
		<?php endforeach ?>
	</table>
</div>
<div id="Historytransaction" class="tabcontent">
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
	
		<form method="post" target="admin.php" class="ajax">
			<input type="hidden" name="id" value="<?php echo $value->htId ?>">
			<input type="hidden" name="table_name" value="historytransaction">
			<td><input type="submit" name="delete_music" value="Delete"></td>
		</form>
	</tr>
	<?php endforeach ?>
	
</table>
</div>

    <div class="modal fade" id="editModal" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Input data</h4>
          </div>
          <div class="modal-body">
            <form id="edit-frm" class="form-horizontal">
            	<?php 
            		$attrib = array('musicId' => 'ID', 'musicName' => 'Name','author' => 'Author','musicLink'=>'Link','nodesLink'=>'Nodes Link','hardLevel'=>'Hard Level','count'=>'Count');
            	 ?>
            	 <?php foreach ($attrib	as $var => $type): ?>
            	 	
            	 	<div class="form-group">
	                <label class="control-label col-sm-2" for="email"><?php echo $type ?></label>
	                <div class="col-sm-10">
	                  <input type="text" class="form-control" name=<?php echo $var ?> id="id" placeholder="">
	                </div>
	              </div>
            	 <?php endforeach ?>

            </form>
          </div>
          <div class="modal-footer">
            <button id="submit" data-car-id="1" type="button" class="btn btn-default" data-dismiss="modal">Submit</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

</body>

<script type="text/javascript">
	function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
</script>


<script>
// Attach a submit handler to the form
$( ".ajax" ).submit(function( event ) {
 
  // Stop form from submitting normally
  event.preventDefault();
 
  // Get some values from elements on the page:
  var $form = $( this ),
    term = $form.serializeArray(),
    url = $form.attr( "action" );
 
  // Send the data using post
  console.log($form.serializeArray());
  $.ajax({
  	url:'/admin.php',
  	type: 'POST',
  	data: term,
  	success: function( data ) {
  		alert("successfully");
  		location.reload();
  	}
  });
});


$('#btn-edit-frm').click(function(){
    $("#editModal").modal();
});

  function getFormData(id){
    var frmObj = {};
    var data = $(id).serializeArray();

    console.log(data);
    $.each(data, function(i, input){
      frmObj[input.name] = input.value;
    });
    console.log(frmObj);
    return frmObj;
  }

  $("#submit").click(function(){
        var frmId = "#edit-frm";
        // Make sure get Form data grap disabled elemebts
        $('#id').prop('disabled', false);

        var input = getFormData(frmId);

        var data = {
          url : "/admin.php",
          type : "POST",
          data : input,
          success: function(){
            alert("Action complete");
            location.reload();
          },
          error: function(){
            alert("Error!!");
          }
        };

        console.log(data);

        $.ajax(data);
      });
</script>

</html>