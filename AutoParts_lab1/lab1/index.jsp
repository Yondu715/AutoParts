<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="styles/auth.css" type="text/css">
	<title>Авторизация</title>
</head>

<body>
	<div class="wrap">
		<div class="container-reg">
			<form method="post" action="auth">
				<span class="span-auth">Авторизация</span>
				<input type="text" placeholder="Введите логин" autocomplete="off" name="login">
				<input type="password" placeholder="Введите пароль" name="password">
				<input type="submit" value="Войти" class="ok">
			</form>
		</div>
	</div>
</body>

</html>