const fs = require('fs');
const path = require('path');

// Gera um arquivo WAV limpo e suave com arpeggios românticos de piano/celesta
const sampleRate = 44100;
const bpm = 72;
const beatDuration = 60 / bpm; // segundos por batida
const totalBars = 8;
const beatsPerBar = 4;
const totalDuration = totalBars * beatsPerBar * beatDuration; // ~26.6 segundos
const numSamples = Math.floor(sampleRate * totalDuration);

// Progressão clássica romântica: D, A, Bm, F#m, G, D, G, A
const chords = [
  [146.83, 220.00, 293.66, 369.99, 440.00], // D: D3, A3, D4, F#4, A4
  [110.00, 164.81, 220.00, 277.18, 329.63], // A: A2, E3, A3, C#4, E4
  [123.47, 185.00, 246.94, 293.66, 369.99], // Bm: B2, F#3, B3, D4, F#4
  [92.50,  146.83, 185.00, 220.00, 277.18], // F#m: F#2, D3, F#3, A3, C#4
  [98.00,  146.83, 196.00, 246.94, 293.66], // G: G2, D3, G3, B3, D4
  [146.83, 220.00, 293.66, 369.99, 440.00], // D: D3, A3, D4, F#4, A4
  [98.00,  146.83, 196.00, 246.94, 293.66], // G: G2, D3, G3, B3, D4
  [110.00, 164.81, 220.00, 277.18, 329.63], // A: A2, E3, A3, C#4, E4
];

const leftBuffer = new Float32Array(numSamples);
const rightBuffer = new Float32Array(numSamples);

for (let bar = 0; bar < totalBars; bar++) {
  const barStartTime = bar * beatsPerBar * beatDuration;
  const chord = chords[bar % chords.length];

  // Para cada nota do acorde, toca notas arpejadas
  for (let noteIdx = 0; noteIdx < chord.length; noteIdx++) {
    const freq = chord[noteIdx];
    const noteTime = barStartTime + (noteIdx * beatDuration * 0.7);
    const noteStartSample = Math.floor(noteTime * sampleRate);
    const noteDuration = beatDuration * 3.5;
    const noteEndSample = Math.min(numSamples, noteStartSample + Math.floor(noteDuration * sampleRate));

    for (let s = noteStartSample; s < noteEndSample; s++) {
      const t = (s - noteStartSample) / sampleRate;
      // Envelope suave de piano: attack rápido (15ms) e decaimento exponencial
      const attack = Math.min(1.0, t / 0.015);
      const decay = Math.exp(-t * 1.8);
      const env = attack * decay * 0.18;

      // Harmônicos do piano
      const fundamental = Math.sin(2 * Math.PI * freq * t);
      const secondHarmonic = 0.45 * Math.sin(2 * Math.PI * (freq * 2) * t);
      const thirdHarmonic = 0.2 * Math.sin(2 * Math.PI * (freq * 3) * t);
      const sample = (fundamental + secondHarmonic + thirdHarmonic) * env;

      // Panning suave
      const pan = (noteIdx / (chord.length - 1)) * 0.4 + 0.3; // 0.3 to 0.7
      leftBuffer[s] += sample * (1 - pan);
      rightBuffer[s] += sample * pan;
    }
  }
}

// Fade in e Fade out nas bordas para loop perfeito
const fadeSamples = Math.floor(sampleRate * 1.5);
for (let i = 0; i < fadeSamples; i++) {
  const f = i / fadeSamples;
  leftBuffer[i] *= f;
  rightBuffer[i] *= f;
  leftBuffer[numSamples - 1 - i] *= f;
  rightBuffer[numSamples - 1 - i] *= f;
}

// Construir cabeçalho WAV
const wavHeader = Buffer.alloc(44);
const dataSize = numSamples * 4; // 16-bit stereo = 4 bytes per sample
const fileSize = 36 + dataSize;

wavHeader.write('RIFF', 0);
wavHeader.writeUInt32LE(fileSize, 4);
wavHeader.write('WAVE', 8);
wavHeader.write('fmt ', 12);
wavHeader.writeUInt32LE(16, 16); // subchunk1 size
wavHeader.writeUInt16LE(1, 20); // PCM
wavHeader.writeUInt16LE(2, 22); // stereo
wavHeader.writeUInt32LE(sampleRate, 24);
wavHeader.writeUInt32LE(sampleRate * 4, 28); // byte rate
wavHeader.writeUInt16LE(4, 32); // block align
wavHeader.writeUInt16LE(16, 34); // bits per sample
wavHeader.write('data', 36);
wavHeader.writeUInt32LE(dataSize, 40);

const pcmData = Buffer.alloc(dataSize);
let offset = 0;
for (let i = 0; i < numSamples; i++) {
  // Clamp entre -1.0 e 1.0
  const l = Math.max(-1.0, Math.min(1.0, leftBuffer[i]));
  const r = Math.max(-1.0, Math.min(1.0, rightBuffer[i]));
  pcmData.writeInt16LE(Math.floor(l * 32767), offset);
  pcmData.writeInt16LE(Math.floor(r * 32767), offset + 2);
  offset += 4;
}

const outputPath = path.join(__dirname, '..', 'public', 'music', 'casamento.mp3');
fs.writeFileSync(outputPath, Buffer.concat([wavHeader, pcmData]));
console.log('Música criada com sucesso em:', outputPath);
