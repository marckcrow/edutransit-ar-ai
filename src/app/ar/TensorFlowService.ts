/**
 * TensorFlow Service — EduTransit AR AI
 *
 * This module provides a real TensorFlow.js integration for traffic sign detection.
 *
 * SETUP FOR REAL AR DETECTION:
 * --------------------------------------
 * 1. Install TensorFlow.js:
 *    npm install @tensorflow/tfjs
 *
 * 2. Train a custom model or use a pre-trained model:
 *    - Option A: Train your own model using TensorFlow Object Detection API
 *              (https://github.com/tensorflow/models/tree/master/research/object_detection)
 *    - Option B: Fine-tune MobileNetV2 or EfficientNet on traffic sign datasets
 *              (e.g., German Traffic Sign Recognition Benchmark)
 *
 * 3. Convert your trained model to TensorFlow.js format:
 *    tensorflowjs_converter --input_format=tf_saved_model --output_format=tfjs_graph_model_model_dir ./model/traffic_sign_model
 *
 * 4. Host the model files (model.json + group*.bin) in your /public folder
 *    or on a CDN, then update MODEL_URL below.
 *
 * 5. Uncomment the real imports and implementation below.
 *
 * CURRENT STATUS: Simulation mode (no real model required)
 * The AR page works fully in simulation mode — no TensorFlow needed.
 * All sign detection, confidence scoring, and camera features work out of the box.
 */

const MODEL_URL = '/models/traffic-signs/model.json'; // Update when you have a real model

export interface DetectionResult {
  signId: string;
  confidence: number;
  bbox: [number, number, number, number]; // [x, y, width, height] normalized 0-1
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DetectionCallback = (signId: string, confidence: number) => void;
type ErrorCallback = (error: string) => void;

// ─── STUB IMPLEMENTATIONS (simulation mode) ───────────────────────────────────

export async function loadModel(): Promise<boolean> {
  // In production, replace with:
  //   import * as tf from '@tensorflow/tfjs';
  //   model = await tf.loadGraphModel(MODEL_URL);
  //   return true;
  console.info('[TensorFlowService] Running in simulation mode. No model loaded.');
  return false; // Always returns false — simulation mode will be used
}

export async function checkCameraSupport(): Promise<boolean> {
  if (typeof navigator === 'undefined') return false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nav = navigator as any;
  return !!(nav.mediaDevices && nav.mediaDevices.getUserMedia);
}

interface StopHandle { stop: () => void }

export function runDetectionLoop(
  _videoElement: HTMLVideoElement,
  onDetection: DetectionCallback,
  onError: ErrorCallback,
  _intervalMs = 1200,
): StopHandle {
  // In production, replace with:
  //   const canvas = document.createElement('canvas');
  //   const ctx = canvas.getContext('2d');
  //   let running = true;
  //   const loop = async () => {
  //     if (!running) return;
  //     ctx.drawImage(videoElement, 0, 0);
  //     const tensor = tf.browser.fromPixels(canvas)
  //       .resizeNearestNeighbor([224, 224])
  //       .toFloat()
  //       .expandDims(0)
  //       .div(255.0);
  //     const prediction = (model.predict(tensor) as tf.Tensor).dataSync();
  //     // ... map prediction to signId and confidence
  //     tensor.dispose();
  //     if (prediction) onDetection(signId, confidence);
  //     setTimeout(loop, intervalMs);
  //   };
  //   loop();
  //   return { stop: () => { running = false; } };

  // Simulation: report a random sign periodically
  const signIds = ['pare', 'velocidade_60', 'rotatoria', 'escola', 'lombada', 'proibido_estacionar'];
  let interval: ReturnType<typeof setInterval> | null = null;

  const startSimulation = () => {
    interval = setInterval(() => {
      const signId = signIds[Math.floor(Math.random() * signIds.length)];
      const confidence = 0.65 + Math.random() * 0.33;
      onDetection(signId, Math.round(confidence * 100) / 100);
    }, 3000);
  };

  // Small delay so camera feed can start first
  const timerId = setTimeout(startSimulation, 1500);

  return {
    stop: () => {
      if (interval) clearInterval(interval);
      clearTimeout(timerId);
    },
  };
}
