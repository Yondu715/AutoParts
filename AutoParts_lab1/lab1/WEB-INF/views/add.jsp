<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

	<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
	<html>

	<head>
		<meta charset="UTF-8">
		<link rel="stylesheet" href="styles/main.css" type="text/css">
		<title>Добавить</title>
	</head>

	<body>
		<div class="wrap">
			<div class="container">
				<div class="content">
					<form method="post" action="add" id="info">
						<div class="name">
							<span>Название: </span>
							<input class="info" type="text" autocomplete="off" name="name">
						</div>
						<div class="cost">
							<span>Стоимость: </span>
							<input class="info" type="text" autocomplete="off" name="cost">
						</div>
						<div class="count">
							<span>Количество: </span>
							<input class="info" type="text" autocomplete="off" name="count">
						</div>
					</form>
				</div>
				<div class="control">
					<input class="add_btn" type="submit" value="ОК" form="info"></input>
					<form method="post" action="main">
						<input class="delete_btn" type="submit" value="Назад"></input>
					</form>
				</div>
			</div>
		</div>
	</body>

	</html>