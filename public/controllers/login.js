var app = angular.module('edubuddy', []);

app.controller('LoginController', function($scope, $http) {
    const { createClient } = supabase;

  const SUPABASE_URL = 'https://delgfvwiakcgzglrqucs.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbGdmdndpYWtjZ3pnbHJxdWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyODgzODksImV4cCI6MjA2ODg2NDM4OX0.qZ9RZDhC-dsDT19L3YMA1H2yEP2lVX_cAluHk3Zimws';

  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

  $scope.login = async function() {
    try {
        const { data: teachers, error } = await supabaseClient
            .from('teachers')
            .select('Username, AsalSekolah, Password')
            .eq('Email', $scope.email);

        if (error || !teachers || teachers.length === 0) {
            alert("Email tidak ditemukan.");
            console.error("Teacher fetch error:", error);
            return;
        }

        // Example: check password for the first matching teacher
        const teacher = teachers.find(t => t.Password === $scope.password);

        if (!teacher) {
            alert("Password salah.");
            return;
        }

        // Set localStorage and redirect as before
        localStorage.setItem('Username', teacher.Username);
        localStorage.setItem('AsalSekolah', teacher.AsalSekolah);
        localStorage.setItem('LoginTime', new Date().toISOString());
        const redirectUrl = localStorage.getItem("redirectAfterLogin");

        if (redirectUrl) {
            localStorage.removeItem("redirectAfterLogin");
            window.location.href = redirectUrl;
        } else {
            window.location.href = '/viewDataMenu';
        }
    } catch (err) {
        alert("Terjadi kesalahan saat login. Silakan coba lagi nanti.");
        console.error("Login error:", err);
    }
};
});
