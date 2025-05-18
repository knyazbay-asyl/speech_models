package service.work.adminwork1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "speech_models")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SpeechModel {
    public void setId(Long id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getGladia() {
        return gladia;
    }

    public void setGladia(String gladia) {
        this.gladia = gladia;
    }

    public String getFastwhisper() {
        return fastwhisper;
    }

    public void setFastwhisper(String fastwhisper) {
        this.fastwhisper = fastwhisper;
    }

    public String getYandexSpeechKit() {
        return yandexSpeechKit;
    }

    public void setYandexSpeechKit(String yandexSpeechKit) {
        this.yandexSpeechKit = yandexSpeechKit;
    }

    @Column(nullable = false)
    private String name;

    @Column(name = "gladia", columnDefinition = "TEXT")
    private String gladia;

    @Column(name = "fastwhisper", columnDefinition = "TEXT")
    private String fastwhisper;

    @Column(name = "yandex_speech_kit", columnDefinition = "TEXT")
    private String yandexSpeechKit;
} 