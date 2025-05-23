let video;
let facemesh;
let predictions = [];
const indices = [409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291];
const indices2 = [76,77,90,180,85,16,315,404,320,307,306,408,304,303,302,11,72,73,74,184];

function setup() {
  createCanvas(640, 480).position(
    (windowWidth - 640) / 2,
    (windowHeight - 480) / 2
  );
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on('predict', results => {
    predictions = results;
  });
}

function modelReady() {
  // 模型載入完成，可選擇顯示訊息
}

function draw() {
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    // 先畫第一組紅色線
    stroke(255, 0, 0);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < indices.length; i++) {
      const idx = indices[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape();

    // 再畫第二組紅色線並填滿藍色
    stroke(255, 0, 0);
    strokeWeight(2);
    fill(0, 0, 255, 200); // 半透明藍色
    beginShape();
    for (let i = 0; i < indices2.length; i++) {
      const idx = indices2[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape(CLOSE);

    // 在第一組與第二組之間充滿綠色
    fill(0, 255, 0, 150); // 半透明綠色
    noStroke();
    beginShape();
    // 先畫第一組
    for (let i = 0; i < indices.length; i++) {
      const idx = indices[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    // 再畫第二組（反向，避免交錯）
    for (let i = indices2.length - 1; i >= 0; i--) {
      const idx = indices2[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape(CLOSE);

    // 利用line指令，依照 indices3 連線（藍色線段）
    const indices3 = [243,190,56,28,27,29,30,247,130,25,110,24,23,22,26,112];
    stroke(0, 0, 255); // 藍色線
    strokeWeight(2);
    for (let i = 0; i < indices3.length - 1; i++) {
      const idxA = indices3[i];
      const idxB = indices3[i + 1];
      const [x1, y1] = keypoints[idxA];
      const [x2, y2] = keypoints[idxB];
      line(x1, y1, x2, y2);
    }

    // 利用line指令，依照 indices4 連線
    const indices4 = [133,173,157,158,159,160,161,246,33,7,163,144,145,153,154,155];
    stroke(255, 255, 0); // 黃色線
    strokeWeight(2);
    for (let i = 0; i < indices4.length - 1; i++) {
      const idxA = indices4[i];
      const idxB = indices4[i + 1];
      const [x1, y1] = keypoints[idxA];
      const [x2, y2] = keypoints[idxB];
      line(x1, y1, x2, y2);
    }

    // 右眼外圈：藍綠色線段
    const rightEyeOuter = [359,467,260,259,257,258,286,414,463,341,256,252,253,254,339,255];
    stroke(0, 255, 255); // 藍綠色
    strokeWeight(2);
    for (let i = 0; i < rightEyeOuter.length - 1; i++) {
      const idxA = rightEyeOuter[i];
      const idxB = rightEyeOuter[i + 1];
      const [x1, y1] = keypoints[idxA];
      const [x2, y2] = keypoints[idxB];
      line(x1, y1, x2, y2);
    }

    // 右眼內圈：紫色線段
    const rightEyeInner = [263,466,388,387,386,385,384,398,362,382,381,380,374,373,390,249];
    stroke(128, 0, 128); // 紫色線
    strokeWeight(2);
    for (let i = 0; i < rightEyeInner.length - 1; i++) {
      const idxA = rightEyeInner[i];
      const idxB = rightEyeInner[i + 1];
      const [x1, y1] = keypoints[idxA];
      const [x2, y2] = keypoints[idxB];
      line(x1, y1, x2, y2);
    }
  }
}
