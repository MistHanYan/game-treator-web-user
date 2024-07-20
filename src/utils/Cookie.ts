export function setCookie(name: string, value: string, days: number): any{
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const cookieValue = encodeURIComponent(value) + (days ? "; expires=" + expirationDate.toUTCString() : "");
    document.cookie = name + "=" + cookieValue + "; path=/";
}


// 获取 cookie
export function getCookie(name: string): string | undefined {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key.trim() === name) {
            return value;
        }
    }
    return undefined;
}