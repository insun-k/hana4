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
<h1 class="text-2xl">Modify Cust</h1>
<form action="${pageContext.request.contextPath}modify" method="POST">
    <label for="name">Name:
        <input type="text" id="name" name="name" value="${cust.name}">
    </label>
    <label for="name">Tel:
        <input type="tel" id="tel" name="tel" value="${cust.tel}">
    </label>

    <button type="submit" class="hover:text-blue-800 border rounded-md px-2 bg-slate-300 hover:bg-slate-200">Save
    </button>


</form>
</body>
</html>
