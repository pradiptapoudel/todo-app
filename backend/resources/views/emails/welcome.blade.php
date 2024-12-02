<!DOCTYPE html>
<html>
<head>
    <title>Welcome to {{ config('app.name') }}</title>
</head>
<body>
    <h1>Welcome, {{ $user->name }}!</h1>
    <p>
        Thank you for joining {{ config('app.name') }}. We're excited to have you with us.
    </p>
    <p>
        No reply email
    </p>
    <p>
        Best regards,<br>
        The {{ config('app.name') }} Team
    </p>
</body>
</html>
