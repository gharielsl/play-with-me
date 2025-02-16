async function resizeImage(dataUrl: string, max: number) {
    return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.src = dataUrl;
        img.onload = function () {
            let { width, height } = img;

            if (width > height && width > max) {
                height = Math.round(height * (max / width));
                width = max;
            } else if (height > max) {
                width = Math.round(width * (max / height));
                height = max;
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                return reject();
            }

            ctx.drawImage(img, 0, 0, width, height);

            resolve(canvas.toDataURL('image/png'));
        };
    });
}

export {
    resizeImage
};
