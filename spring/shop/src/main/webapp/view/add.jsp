<%--
  User: campus2H030
  Date: 2024-11-25
  Time: 오후 3:20
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<html>
<%@ include file="./head.jsp" %>

<body>
<h1 class="text-2xl">Add Cust</h1>
<form action="${pageContext.request.contextPath}add" method="POST">
    <label for="name">Name:
        <input type="text" id="name" name="name">
    </label>
    <label for="name">Tel:
        <input type="tel" id="tel" name="tel">
    </label>

    <input type="submit" value="Add">


</form>
</body>
</html>
