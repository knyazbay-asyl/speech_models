package service.work.adminwork1.service;

import org.springframework.transaction.annotation.Transactional;
import service.work.adminwork1.model.SpeechModel;
import service.work.adminwork1.repository.SpeechModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SpeechModelService {

    private final SpeechModelRepository repository;

    @Autowired
    public SpeechModelService(SpeechModelRepository repository) {
        this.repository = repository;
    }

    public List<SpeechModel> getAllModels() {
        return repository.findAll();
    }

    public Optional<SpeechModel> getModelByName(String name) {
        return repository.findByName(name);
    }

    public SpeechModel createModel(SpeechModel model) {
        return repository.save(model);
    }

    public SpeechModel updateModel(Long id, SpeechModel model) {
        if (repository.existsById(id)) {
            model.setId(id);
            return repository.save(model);
        }
        throw new RuntimeException("Model not found with id: " + id);
    }

    @Transactional
    public List<SpeechModel> updateAllModels(List<SpeechModel> models) {
        return repository.saveAll(models);
    }
} 