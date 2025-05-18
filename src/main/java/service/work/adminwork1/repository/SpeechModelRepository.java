package service.work.adminwork1.repository;

import service.work.adminwork1.model.SpeechModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SpeechModelRepository extends JpaRepository<SpeechModel, Long> {
    Optional<SpeechModel> findByName(String name);
} 